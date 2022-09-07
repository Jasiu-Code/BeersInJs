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

  function displayRandomBeer(data) {
    data
      .map((beer) => {
        randomBeer.innerHTML += `
        <div class='beerContainer'>
            <h3 class='name'>${beer.name}</h3>
            <img src='${beer.image_url}'></img>
            <p>${beer.description}</p>
        </div>
        `;
      })
      .join("");
  }

  function displayAllBeers(data) {
    data
      .map((beer) => {
        beersContainer.innerHTML += `
        <div class='beerContainer'>
            <h3 class='name'>${beer.name}</h3>
            <img src='${beer.image_url}'></img>
            <p>${beer.description}</p>
            <button class="add">Add to Favourite</button>
            </div>
            `;
      })
      .join("");
  }
  beersContainer.addEventListener("click", function (e) {
    const tgt = e.target.closest(".add");
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
        <button class="removeBtn">Remove</button>
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
    const response = await fetch("https://api.punkapi.com/v2/beers");
    const data = await response.json();
    displayAllBeers(data);
  }
  async function getRandomBeer() {
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    const data = await response.json();
    displayRandomBeer(data);
  }
  getAllBeers();
  getRandomBeer();
}
