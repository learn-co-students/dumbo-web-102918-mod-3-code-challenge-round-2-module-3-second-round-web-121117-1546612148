document.addEventListener('DOMContentLoaded', () => {
  let ulListGroup = document.getElementById('list-group')
  let beerInfo = document.getElementById('beer-detail')

  //displaying beer names
  fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(data => {
    data.forEach((beer) => {

      ulListGroup.append(getBeerName(beer.id, beer.name))
    })
  })

  //display beer info
  ulListGroup.addEventListener('click', (event) =>{
    id = event.target.dataset.id

    if (event.target.classList.contains('list-group-item')){
      fetch(`http://localhost:3000/beers/${id}`)
      .then(response => response.json())
      .then(data => {
        // debugger
        getBeerInfo(data.id, data.name, data.image_url, data.tagline, data.description)
      })
    }
  })

  //edit beer
  beerInfo.addEventListener('click', (event) => {

    let beerText = document.querySelector('textarea')
    id = event.target.parentNode.dataset.id


    if(event.target.id === 'edit-beer'){
      fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: beerText.value
        })
      }).then(response => response.json())
      .then(data => {

        beerText.value = data.description
      })
    }
  })


})

//get beer name function
function getBeerName (id, name) {
  let beerList = document.createElement('li')
  beerList.dataset.id = id
  beerList.classList = 'list-group-item'
  beerList.innerText = name

  return beerList
}

//get beer information
function getBeerInfo(id, name, image, tagline, description) {
  let beerInfo = document.getElementById('beer-detail')
  beerInfo.dataset.id = id
  beerInfo.innerHTML = `
  <h1>${name}</h1>
  <img src= ${image}>
  <h3>${tagline}</h3>
  <textarea>${description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>`

  return beerInfo
}
