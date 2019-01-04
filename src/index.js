document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  });

//Step 1 - Display All Beer Names -19minutes

//fetch Beers 

fetch('http://localhost:3000/beers')
  .then(res => res.json())
  .then(beers => displayBeers(beers))

const listGroup = document.getElementById('list-group')

function displayBeers(beers){
    beers.map(beer => {
        let li = document.createElement('li')
        li.append(beer.name)
        li.id = beer.id  //to get details.
        listGroup.appendChild(li)
    })
}

//Step 2 - Display Single Beer Details
const beerDetail = document.getElementById('beer-detail')
//_______addEventListener_______________________
listGroup.addEventListener('click', event=>{
    event.preventDefault
    let beerId = event.target.id

    //fetch that particular beer 

    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(res => res.json())
        .then(beer => displayDetail(beer))
})

//__________Display Detail _____________
function displayDetail(beer){
    console.log(beer)
    let h1 = document.createElement('h1')
        h1.innerHTML = beer.name
    beerDetail.append(h1)

    let img = document.createElement('img')
    img.src = beer.image_url    
    beerDetail.appendChild(img) 




    let h2 = document.createElement('h2')
        h2.innerHTML = beer.tagline
        beerDetail.appendChild(h2)    

    let textArea = document.createElement('textarea')
        beerDetail.appendChild(textArea)
        textArea.innerHTML = beer.description

    let h3 = document.createElement('h3')
    let h4 = document.createElement('h4')
        h4.innerHTML = "Food Pairing:" 
        beerDetail.appendChild(h4)

        h3.innerHTML = beer.food_pairing
        beerDetail.appendChild(h3)

    let editButton = document.createElement('button')
        editButton.dataset.id = beer.id   //allows edit
        editButton.innerHTML = "Save-edit"
        beerDetail.appendChild(editButton)

//_________addEventListener to editButton
document.querySelector('button').addEventListener('click', event=>{
    event.preventDefault()
    id = event.target.dataset.id
   
    // console.log(textArea.innerHTML)
    console.log(textArea.innerText)
    saveEdit(id)

function saveEdit(id){
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({description: `${textArea}`}),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
        .then(res => console.log(res)) //pass this to updateDom(res) function. I RAN OUT OF TIME FOR THIS. 
}
})
}

//Wasted 20min on troubleshooting this:
//Problem: Description is not saved properly when edit is pressed.
// It shows up as 'object object' instead. 
//I think it how I'm patching 'description:'
