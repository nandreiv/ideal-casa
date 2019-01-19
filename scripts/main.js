
const anunturiList = document.querySelector('#lista-anunturi');
const form = document.querySelector('#addAnunt');

// Create elements and render
function renderAnunturi(doc){

  let an = doc.data().an;
  let camere = doc.data().camere;
  let descriere = doc.data().descriere;
  let pret = doc.data().pret;
  let suprafata = doc.data().suprafata;

  let str = `<div class="col s12 m4 l3 xl2">
              <div class="card medium">
                <div class="card-image">
                  <img src="img/flat2.jpg" class="imgCard">
                </div>
              <div class="card-content">
                <p>${descriere}</p>
              </div>
              <div id="detaliiImob">
                <p><i class="tiny material-icons">euro_symbol</i> ${pret}</p>
                <p><i class="tiny material-icons">aspect_ratio</i> ${suprafata} m²</p>
                <p><i class="tiny material-icons">local_hotel</i> ${camere}</p>
                <p><i class="tiny material-icons">location_city</i> ${an}</p>
              </div>
              <div class="card-action">
                <a href="#">Detalii</a>
              </div>
            </div>
          </div>`

  anunturiList.insertAdjacentHTML('afterbegin',str);

  console.log(an);
  console.log(camere);
  console.log(descriere);
  console.log(pret);
  console.log(suprafata);
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
    suprafata: form.suprafataImobil.value
  });
  form.reset();
})
