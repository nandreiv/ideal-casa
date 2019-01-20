const anunturiList = document.querySelector('#anunturiContainer');
const detaliiShow = document.querySelector('#detaliiContainer');
const form = document.querySelector('#addAnunt');

// Create elements and render
function renderAnunturi(doc) {

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
                  <button class="btn wave-effect waves-light" onclick='showDetails(this)'>Detalii</button>
                </div>
              </div>
            </div>`

  anunturiList.insertAdjacentHTML('afterbegin', str);
}

// Showing setails for the card
function showDetails(elem) {

  let id = elem.parentElement.parentElement.parentElement.getAttribute('data-id');
  let anunt = db.collection('anunturi').doc(id);
  anunt.get().then(function(doc) {
    if (doc.exists) {
      document.querySelector('#anunturiContainer').innerHTML = "";

      let an = doc.data().an;
      let camere = doc.data().camere;
      let descriere = doc.data().descriere;
      let pret = doc.data().pret;
      let suprafata = doc.data().suprafata;

      console.log(an, camere, descriere, pret, suprafata);

      let str = `<div class="row anunt">
                    <div class="image col s12">
                    <div class="pics">
                      <a class="carousel-item" href="img/flat1.jpg"><img src="img/flat1.jpg"></a>
                      <a class="carousel-item" href="#two!"><img src="img/flat2.jpg"></a>
                      <a class="carousel-item" href="#three!"><img src="img/flat3.jpg"></a>
                      <a class="carousel-item" href="#four!"><img src="img/flat1.jpg"></a>
                      <a class="carousel-item" href="#five!"><img src="img/flat2.jpg"></a>
                    </div>
                    </div>
                    <div class="col s12" id="detaliiImob">
                      <p><i class="tiny material-icons">euro_symbol</i> ${pret}</p>
                      <p><i class="tiny material-icons">aspect_ratio</i> ${suprafata} m²</p>
                      <p><i class="tiny material-icons">local_hotel</i> ${camere}</p>
                      <p><i class="tiny material-icons">location_city</i> ${an}</p>
                    </div>
                    <div class="content col s12">
                      <p>${descriere}</p>
                    </div>
                </div>`

      detaliiShow.insertAdjacentHTML('afterbegin', str);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
};

// Getting data from database
db.collection('anunturi').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderAnunturi(doc);
  });
});

// Filtered render
let searchFilter = document.querySelector('#searchFilter');

searchFilter.addEventListener('click', (e) => {
  let pret = document.querySelector('#filtruPret').value;
  let supraf = document.querySelector('#filtruSupraf').value;
  document.querySelector('#anunturiContainer').innerHTML = "";
  db.collection('anunturi').where('pret', '<', `${pret}`).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderAnunturi(doc);
    });
  });
});

// Sorting results by price
let sortPrice = document.querySelector('#sortPret');

sortPrice.addEventListener('click', (e) => {
  document.querySelector('#anunturiContainer').innerHTML = "";
  db.collection('anunturi').orderBy('pret', 'desc').get().then((snapshot) => {
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

// Carousel details
detaliiShow.addEventListener('DOMNodeInserted', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init();
  });
