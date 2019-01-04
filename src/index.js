document.addEventListener("DOMContentLoaded", () => {
  getBeers()
})

let beerCollection = document.querySelector(".list-group");
let specificBeerShow = document.querySelector('#beer-detail');
function getBeers() {
  fetch(`http://localhost:3000/beers`)
  .then(res => res.json())
  .then(data => showBeers(data))
}

function showBeers(data) {
  data.forEach(beer => {
    let li = document.createElement("li");
    beerName = beer.name;
    beerId = beer.id;
    li.dataset.id = beerId;
    li.innerText = ` ${beerName}`;
    li.className = "list-group-item";
    beerCollection.prepend(li);
  })
}

beerCollection.addEventListener("click", checkBeer)

function checkBeer(event) {
  if (event.target.parentNode.className === "list-group") {
    let currentBeerId = event.target.dataset.id;
    specificBeerShow.innerHTML = "";
    fetchSpecificBeer(currentBeerId)
  }
}

function fetchSpecificBeer(id) {
  fetch(`http://localhost:3000/beers/${id}`)
  .then(res => res.json())
  .then(data => showSpecificBeer(data))
}


function showSpecificBeer(data) {
  let specificBeerContainer = document.createElement('div')
  let beerName = data.name
  let beerId = data.id
  let beerTag = data.tagline
  let beerImage = data.image_url
  let beerDescription = data.description
  specificBeerContainer.innerHTML = `<h1>${beerName}</h1>
  <img src="${beerImage}">
  <h3>${beerTag}</h3>
  <textarea class="beer-Descr">${beerDescription}</textarea>
  <button id="edit-beer" data-id=${beerId} class="btn btn-info">
    Save
  </button>`
  specificBeerShow.append(specificBeerContainer);
}

let beerDetail = document.querySelector('#beer-detail');
beerDetail.addEventListener("click", prepareBeerPatch)

function prepareBeerPatch(event) {
  if (event.target.id === "edit-beer") {
    let currentBeerId = event.target.dataset.id
    let currentBeerParent = event.target.parentNode
    let currentBeerDescr = currentBeerParent.querySelector('.beer-Descr').value
    console.log(currentBeerDescr)
    patchCurrentBeer(currentBeerId, currentBeerDescr);
  }
}

function patchCurrentBeer(id, beerDescr) {
  fetch(`http://localhost:3000/beers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description: `${beerDescr}`
    })
  })
  .then(res => res.json())
}
