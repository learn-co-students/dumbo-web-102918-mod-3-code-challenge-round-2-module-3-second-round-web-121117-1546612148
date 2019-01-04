const ul = document.getElementById('list-group')
ul.addEventListener('click', beerDetail)


fetch('http://localhost:3000/beers')
.then(r => r.json())
.then(renderNames)

function renderNames(data) {
  data.forEach(beerName)
}

function beerName(beer) {
  const li = document.createElement('li')
  li.setAttribute('class', 'list-group-item')
  li.dataset.id = beer.id
  li.innerText = beer.name
  ul.appendChild(li)
}


function beerDetail(event) {
  if (event.target.className === 'list-group-item') {
    const linkId = event.target.dataset.id
    console.log(linkId);
    fetch(`http://localhost:3000/beers/${linkId}`)
    .then(r => r.json())
    .then(beer)
  }
}

function beer(data) {
  const infoDiv = document.querySelector('.col-md-8')
  const infoDetail = document.getElementById('beer-detail')
  infoDetail.innerHTML = ''
  infoDetail.dataset.id = data.id
  const img = document.createElement('img')
  img.src = data.image_url
  const h3 = document.createElement('h3')
  h3.innerText = data.tagline
  const text = document.createElement('textarea')
  text.setAttribute('class', 'text-area')
  text.innerText = data.description
  const button = document.createElement('button')
  button.setAttribute('id', 'edit-beer')
  button.innerText = 'Save'
  infoDetail.appendChild(img)
  infoDetail.appendChild(h3)
  infoDetail.appendChild(text)
  infoDetail.appendChild(button)
  const saveButton = document.getElementById('edit-beer')
  saveButton.addEventListener('click', edit)

}


function edit(event) {
  const textValue = document.querySelector('.text-area').value
  const beerId = event.target.parentElement.dataset.id
  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: textValue
    })
  })

}
