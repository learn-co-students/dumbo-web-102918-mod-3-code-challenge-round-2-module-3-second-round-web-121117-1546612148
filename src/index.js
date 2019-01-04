 document.addEventListener("DOMContentLoaded", function(){
console.log("DOM HERE")

fetchBeers()
editBeer()
 })

function fetchBeers() {
  fetch("http://localhost:3000/beers")
  .then(res => res.json())
  .then(beers => showBeers(beers))
}

function showBeers(beers){
 let beerUl = document.querySelector("#list-group")
 let beerDiv = document.querySelector("#beer-detail")
 beers.forEach(function(beer){
   let li = document.createElement("li")
   li.className = "list-group-item"
   li.innerText = beer.name
   beerUl.append(li)

   let div = document.createElement("div")
    div.dataset.id = beer.id
  div.innerHTML = `<h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea>${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button>`
beerDiv.append(div)


 })
}

function editBeer() {
  let beerDiv = document.querySelector("#beer-detail")

  beerDiv.addEventListener("click", function(){
    event.preventDefault()

    if (event.target.id === "edit-beer") {
      // edited information and use to update the database, the pessimistic rendering

      let editedText = event.target.parentElement.getElementsByTagName("textarea")[0].value
      let beerId = parseInt(event.target.parentElement.dataset.id)
      fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"description": editedText})
      }).then(res => {
        let beerDiv = document.querySelector(`[data-id = '${beerId}']`)
        beerDiv.getElementsByTagName("textarea")[0].innerTex = editedText
      })

    }

  })
}
// In order to get each beer to show. I have to add an eventlistener to the beer list ul and then sen
// a conditional to filter and only show the one I clicked.  
