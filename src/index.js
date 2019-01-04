const baseUrl = 'http://localhost:3000/beers'
document.addEventListener('DOMContentLoaded', getBeers)

function getBeers() {
    fetch(baseUrl)
    .then(res => res.json())
    .then(json => json.forEach(beer => {
    renderBeer(beer)
    })
    )}


function renderBeer(beer) {
    // console.log(beer)
    let ulListGroup = document.querySelector('#list-group')
    let liGroupItem = document.createElement('li')
        liGroupItem.className = 'list-group-item'
        liGroupItem.innerText = beer.name 
        liGroupItem.id = beer.id
    ulListGroup.appendChild(liGroupItem)
}
    // let divBeerDetail = document.querySelector('#beer-detail')
    // let divDetail = document.createElement('div')
    //     divDetail.id = beer.id
    //     divDetail.class = 'div-detail'
    //     divDetail.hidden = true 
    // divBeerDetail.appendChild(divDetail)

    // let name = document.createElement('h1')
    //     name.innerText = beer.name
    // let img = document.createElement('img')
    //     img.src = beer.image_url
    // let tagline = document.createElement('h3')
    //     tagline.innerText = beer.tagline
    // let description = document.createElement('textarea')
    //     description.innerText = beer.description 
    //     description.id = 'description'
    // let editButton = document.createElement('button')
    //     editButton.id = 'edit-beer'
    //     editButton.class = 'btn btn-info'
    //     editButton.innerText = 'Save'

    // divDetail.appendChild(name)
    // divDetail.appendChild(img)
    // divDetail.appendChild(tagline)
    // divDetail.appendChild(description)
    // divDetail.appendChild(editButton)


// document.querySelector('#beer-detail').addEventListener('click', e => {
//     if (event.target.id === 'edit-beer') {
//         debugger 
//         // let newDescription = event.target.
//     }
// })

document.querySelector('#list-group').addEventListener('click', e => {
    let id = e.target.id 
    if (e.target.id ){
     fetch(`http://localhost:3000/beers/${id}`)
    .then(response => response.json())
    .then(beer => beerDetail(beer))
    }   
})   

function beerDetail(beer) {
    console.log(beer)
    let divBeerDetail = document.querySelector('#beer-detail')
    divBeerDetail.innerHTML = `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea class="text-area" id='${beer.id}'>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>`
}


//WAS WORKING ON THIS WHEN TIME RAN OUT I KNOW IT DOES NOT WORK RN I AM WORKING ON IT :)
document.querySelector('#beer-detail').addEventListener('click', e => {
    let id = event.target.id 
    if (event.target.classList.contains('text-area')) {
     let data = {
         description : document.querySelector('.text-area').value,
     }
        fetch(`http://localhost:3000/beers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
})