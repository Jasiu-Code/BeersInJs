import './styles/main.scss';
import { getAllBeers, getRandomBeer } from './utils/getData.js';
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
function ready() {
  const randomBeerContainer = document.getElementById('randomBeerContainer');
  const beersContainer = document.getElementById('beersContainer');
  const favBeers = document.getElementById('favBeer');
  const fav = favBeers.getElementsByClassName('fav');
  const searchInput = document.querySelector('[data-search]');
  let beersArray = [];

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    console;
    const filteredBeers = beersArray.filter((beer) => {
      return beer.name.toLowerCase().includes(value);
    });
    displayAllBeers(filteredBeers);
  });

  beersContainer.addEventListener('click', function (e) {
    const tgt = e.target.closest('.addFavBtn');
    if (tgt)
      addToFav(
        tgt.closest('.beerContainer').querySelector('.name').textContent
      );
  });
  favBeers.addEventListener('click', function (e) {
    const tgt = e.target.closest('.removeBtn');
    if (tgt)
      removeFav(tgt.closest('.favContainer').querySelector('.fav').textContent);
  });

  function addToFav(name) {
    for (let i = 0; i < fav.length; i++) {
      if (fav[i].innerText == name) {
        alert('Its already your favourite!');
        return;
      }
    }
    favBeers.innerHTML += `
    <li class="favContainer">
        <p class="fav">${name}</p>
        <button class="removeBtn">Delete</button>
    </li>
        `;
  }

  function removeFav(name) {
    const fav = document.getElementsByClassName('fav');
    for (let i = 0; i < fav.length; i++) {
      if (fav[i].innerText == name) {
        fav[i].parentElement.remove();
      }
    }
  }

  function displayRandomBeer(data) {
    data.map((beer) => {
      randomBeerContainer.innerHTML += `
        <div class='randomBeer'>
            <h3 class='name'>${beer.name}</h3>
            <img src='${beer.image_url}'></img>
            <p>${beer.description}</p>
        </div>
        `;
    });
  }
  function displayAllBeers(data) {
    const beersToDisplay = data
      .map((beer) => {
        return `
        <div class='beerContainer'>
            <h3 class='name'>${beer.name}</h3>
            <img src='${beer.image_url}'></img>
            <p>${beer.description}</p>
            <button class="addFavBtn">Favourite</button>
        </div>
        `;
      })
      .join('');
    beersContainer.innerHTML = beersToDisplay;
  }
  getRandomBeer().then((res) => displayRandomBeer(res));
  getAllBeers().then((res) => {
    beersArray = res;
    displayAllBeers(beersArray);
  });
}
