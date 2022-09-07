// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

async function getAllBeers() {
  const response = await fetch("https://api.punkapi.com/v2/beers");
  const data = await response.json();
  displayAllBeers(data);
}
getAllBeers();
async function getRandomBeers() {
  const response = await fetch("https://api.punkapi.com/v2/beers/random");
  const data = await response.json();
  displayRandomBeers(data);
}
getRandomBeers();

function displayRandomBeers(data) {
  const randomBeer = document.getElementById("randomBeer");
  data.map((beer) => {
    console.log(beer.name);
    randomBeer.innerHTML = `
        <div class='beerContainer'>
            <h3 class='name'>${beer.name}</h3>
            <img src='${beer.image_url}'></img>
            <p>${beer.description}</p>
        </div>
        `;
  });
}

function displayAllBeers(data) {
  const beersContainer = document.getElementById("beersContainer");
  data.map((beer) => {
    console.log(beer.name);
    beersContainer.innerHTML += `
      <div class='beerContainer'>
          <h3 class='name'>${beer.name}</h3>
          <img src='${beer.image_url}'></img>
          <p>${beer.description}</p>
          <button onclick="addToFav('${beer.name}')">Add to Favourite</button>
      </div>
      `;
  });
}

function addToFav(name) {
  const favBeers = document.getElementById("favBeer");
  const fav = favBeers.getElementsByClassName("fav");
  console.log(fav.length);
  for (let i = 0; i < fav.length; i++) {
    if (fav[i].innerText == name) {
      alert("Its already your favourite!");
      return;
    }
  }
  favBeers.innerHTML += `
  <div>
    <li class="fav">${name}</li>
    <button onclick="removeFav('${name}')">Remove</button>
  </div>
    `;
}

function removeFav(name) {
  const fav = document.getElementsByClassName("fav");
  for (let i = 0; i < fav.length; i++) {
    if (fav[i].innerText == name) {
      fav[i].parentElement.remove();
    }
  }
  //   var buttonClicked = e.target;
  //   buttonClicked.parentElement.remove();
}
