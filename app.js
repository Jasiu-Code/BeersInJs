if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  const randomBeer = document.getElementById("randomBeer");
  const beersContainer = document.getElementById("beersContainer");
  const favBeers = document.getElementById("favBeer");
  const fav = favBeers.getElementsByClassName("fav");
  const searchInput = document.querySelector("[data-search]");
  let beersArray = [];

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filteredBeers = beersArray.filter((beer) => {
      return beer.name.toLowerCase().includes(value);
    });
    console.log(filteredBeers);
    displayAllBeers(filteredBeers);
  });

  function displayRandomBeer(data) {
    data
      .map((beer) => {
        randomBeer.innerHTML += `
        <div class='randomBeerContainer'>
            <h3 class='name'>${beer.name}</h3>
            <img src='${beer.image_url}'></img>
            <p>${beer.description}</p>
        </div>
        `;
      })
      .join("");
  }

  function displayAllBeers(data) {
    const htmlString = data
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
      .join("");
    beersContainer.innerHTML = htmlString;
  }
  beersContainer.addEventListener("click", function (e) {
    const tgt = e.target.closest(".addFavBtn");
    if (tgt)
      addToFav(
        tgt.closest(".beerContainer").querySelector(".name").textContent
      );
  });
  favBeers.addEventListener("click", function (e) {
    const tgt = e.target.closest(".removeBtn");
    if (tgt)
      removeFav(tgt.closest(".favContainer").querySelector(".fav").textContent);
  });

  function addToFav(name) {
    for (let i = 0; i < fav.length; i++) {
      if (fav[i].innerText == name) {
        alert("Its already your favourite!");
        return;
      }
    }
    favBeers.innerHTML += `
    <div class="favContainer">
        <li class="fav">${name}</li>
        <button class="removeBtn">Delete</button>
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
  }
  async function getAllBeers() {
    const response = await fetch(
      "https://api.punkapi.com/v2/beers?page=2&per_page=80"
    );
    beersArray = await response.json();
    displayAllBeers(beersArray);
  }
  async function getRandomBeer() {
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    const data = await response.json();
    displayRandomBeer(data);
  }
  getAllBeers();
  getRandomBeer();
}
