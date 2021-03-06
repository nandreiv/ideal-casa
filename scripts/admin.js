
const anunturiList = document.querySelector('#anunturiContainer');
const form = document.querySelector('#addAnunt');



// Create elements and render
function renderAnunturi(doc){

  let an = doc.data().an;
  let camere = doc.data().camere;
  let descriere = doc.data().descriere;
  let pret = doc.data().pret;
  let suprafata = doc.data().suprafata;
  let imagini = doc.data().imagini;


  let str = `<div class="col s12 m6 l4 xl3" data-id='${doc.id}'>
              <div class="card medium">
                <div class="card-image">
                  <img src="${imagini}" class="imgCard">
                </div>
              <div class="card-content">
                <p id="cardDescriere">${descriere}</p>
              </div>
              <div id="detaliiImob">
                <i class="tiny material-icons">euro_symbol</i><p id="cardPret">${pret}</p>
                <i class="tiny material-icons">aspect_ratio</i><p id="cardSupraf">${suprafata} </p><p>m²</p>
                <i class="tiny material-icons">local_hotel</i><p id="cardCamere">${camere}</p>
                <i class="tiny material-icons">location_city</i><p id="cardAn">${an}</p>
              </div>
              <div class="card-action admin-action">
                <button class="btn waves-effect waves-light" type="button" name="modify" id="modificaBtn">
                  <i class="material-icons">edit</i>
                </button>
                <button class="btn waves-effect waves-light" type="button" name="delete" id="stergeBtn">
                  <i class="material-icons">delete</i>
                </button>
              </div>
            </div>
          </div>`

  anunturiList.insertAdjacentHTML('afterbegin',str);

  // Deleting data from database
  let sterge = document.querySelector('#stergeBtn');

  sterge.addEventListener('click',(e) => {
    e.stopPropagation();
    let id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
    db.collection('anunturi').doc(id).delete();
  });

  //Updating data in database
  let modifica = document.querySelector('#modificaBtn');
  let modificaAnunt = document.querySelector('#modificaAnuntBtn');

  modifica.addEventListener('click', (e) => {

    e.stopPropagation();
    let id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
    db.collection('anunturi').doc(id).get().then((snapshot) => {
        form.anImobil.value = document.getElementById('cardAn').innerHTML;
        form.camereImobil.value = document.getElementById('cardCamere').innerHTML;
        form.descriereImobil.value = document.getElementById('cardDescriere').innerHTML;
        form.pretImobil.value = document.getElementById('cardPret').innerHTML;
        form.suprafataImobil.value = document.getElementById('cardSupraf').innerHTML;
        document.getElementById('adaugaBtn').classList.add('disabled');
      });

    modificaAnunt.addEventListener('click', (e) => {
      e.preventDefault();
      db.collection('anunturi').doc(id).update({
        an: form.anImobil.value,
        camere: form.camereImobil.value,
        descriere: form.descriereImobil.value,
        pret: form.pretImobil.value,
        suprafata: form.suprafataImobil.value
      });
      form.reset();
    })
  })
}

// Getting data from database
db.collection('anunturi').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderAnunturi(doc);
  });
})

// Adding data to database
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('anunturi').add({
    an: form.anImobil.value,
    camere: form.camereImobil.value,
    descriere: form.descriereImobil.value,
    pret: form.pretImobil.value,
    suprafata: form.suprafataImobil.value,
    imagini: newPhotos
  });
  form.reset();
  newPhotos = [];
})

// Form listener
//form.addEventListener('change', (e) => {
//  document.querySelectorAll('input').removeAttribute('placeholder');
//})

let database = firebase.database();
let storage = firebase.storage();
let imgURL;

function getURL() {
  storage.ref('anunt1/' + photo.name).getDownloadURL().then(function(url){
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          console.log(url);
        })

}

let newPhotos = [];

function addPicture(){
  var fileInput = document.querySelector("#inputfile");
  var files = fileInput.files;
  // cache files.length 
  var fl = files.length;
  var i = 0;
  var urls;

  while ( i < fl) {
      // localize file var in the loop
      var photos = files[i];
      let photonavn = storage.ref('anunt1/' + photos.name);
      photonavn.put(photos);
      var link = storage.ref('anunt1/'+photos.name);
      link.getDownloadURL().then(function(url){
        newPhotos.push(url);
      })
      i++;
  }
}


document.querySelector("#inputfile").onchange=addPicture;