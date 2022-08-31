///for grab all divs add evenet listener // wywyowalnie tej funcki po fetchu
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const beers = document.getElementById("beers");
  const favBeers = document.getElementById("favBeers");
  const favBeer = document.getElementsByClassName("fav");
  function addFav() {
    this.classList.contains("fav")
      ? this.classList.remove("fav")
      : this.classList.add("fav");
    displayFav();
  }

  function displayFav() {
    favBeer.forEach(() => {
      console.log("test");
    });
  }

  fetch("https://api.punkapi.com/v2/beers")
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0]);
      data.map((beer) => {
        const container = document.createElement("div");
        container.classList.add("beerContainer");
        container.addEventListener("click", addFav);
        const title = document.createElement("h3");
        const image = document.createElement("img");
        const description = document.createElement("p");
        title.innerText = beer.name;
        image.src = beer.image_url;
        description.innerText = beer.description;
        container.appendChild(title);
        container.appendChild(image);
        container.appendChild(description);
        beers.append(container);
      });
    });
}
