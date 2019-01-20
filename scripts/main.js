
const anunturiList = document.querySelector('#anunturiContainer');
const detaliiShow = document.querySelector('#detaliiContainer');
const form = document.querySelector('#addAnunt');

// Create elements and render
function renderAnunturi(doc){

  let an = doc.data().an;
  let camere = doc.data().camere;
  let descriere = doc.data().descriere;
  let pret = doc.data().pret;
  let suprafata = doc.data().suprafata;


  let str = `<div class="col s12 m6 l4 xl3" data-id='${doc.id}'>
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
                  <a href="#" class='${doc.id}'>Detalii</a>
                </div>
              </div>
            </div>`

  anunturiList.insertAdjacentHTML('afterbegin',str);
}

function showDetails(doc) {

  document.querySelector('#anunturiContainer').innerHTML = "";

  let an = doc.data().an;
  let camere = doc.data().camere;
  let descriere = doc.data().descriere;
  let pret = doc.data().pret;
  let suprafata = doc.data().suprafata;


  let str = `<div class="col s12">
                <div class="image">
                  <img src="img/flat2.jpg" class="imgCard">
                </div>
                <div class="content">
                  <p>${descriere}</p>
                </div>
                <div id="detaliiImob">
                  <p><i class="tiny material-icons">euro_symbol</i> ${pret}</p>
                  <p><i class="tiny material-icons">aspect_ratio</i> ${suprafata} m²</p>
                  <p><i class="tiny material-icons">local_hotel</i> ${camere}</p>
                  <p><i class="tiny material-icons">location_city</i> ${an}</p>
                </div>
            </div>`

  detaliiShow.insertAdjacentHTML('afterbegin',str);

}

// Getting data from database
db.collection('anunturi').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderAnunturi(doc);
  });
});

// Showing setails for the card
let targetNode = document.getElementById('anunturiContainer');
let setup = { attributes: true, childList: true, subtree: true };
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            let detalii = document.querySelector('.card-action a').getAttribute('class');
            db.collection('anunturi').doc(`${detalii}`).get().then((snapshot) => {
              snapshot.doc.forEach(doc => {
                showDetails(doc);
              })
            });
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};
var observer = new MutationObserver(callback);
observer.observe(targetNode, setup);

// Filtered render
let searchFilter = document.querySelector('#searchFilter');

searchFilter.addEventListener('click',(e) => {
  let pret = document.querySelector('#filtruPret').value;
  let supraf = document.querySelector('#filtruSupraf').value;
  document.querySelector('#anunturiContainer').innerHTML = "";
  db.collection('anunturi').where('pret', '<',`${pret}`).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderAnunturi(doc);
    });
  });
});

// Sorting results by price
let sortPrice = document.querySelector('#sortPret');

sortPrice.addEventListener('click', (e) => {
  document.querySelector('#anunturiContainer').innerHTML = "";
  db.collection('anunturi').orderBy('pret').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderAnunturi(doc);
    });
  });
});

// Sorting results by surface
let sortSupraf = document.querySelector('#sortSupraf');

sortSupraf.addEventListener('click', (e) => {
  document.querySelector('#anunturiContainer').innerHTML = "";
  db.collection('anunturi').orderBy('suprafata').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderAnunturi(doc);
    });
  });
})

// Sorting results by rooms
let sortCamere = document.querySelector('#sortCamere');

sortCamere.addEventListener('click', (e) => {
  document.querySelector('#anunturiContainer').innerHTML = "";
  db.collection('anunturi').orderBy('suprafata').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderAnunturi(doc);
    });
  });
})
