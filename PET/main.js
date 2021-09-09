// Fetch data 
import { getUri } from './common.js'
getUri('http://localhost:3000/catergory').then(data => {

    let eCatergory = document.querySelector('.catergory')
    let html = data.map(item => {
        return `<div class="item-vertical dataID_${item.id}">
      
       <img src="${item.img}" alt="">
       <span>${item.name}</span>
    
    </div>`
    })
    eCatergory.innerHTML = html.join('')
    return data
})
    .then(data => {

        const eCatergory = document.querySelectorAll('.item-vertical')
        eCatergory.forEach(element => {
            element.onclick = function () {
                document.cookie = element.classList[1]

                window.location.href = "http://127.0.0.1:5500/catergory.html";
            }
        })
    })


getUri('http://localhost:3000/pets')
    .then(data => {
        loadOfNumber(8, data)

    })
function loadOfNumber(number, data) {
    let eProdusts = document.querySelector('.products')

    let html = data.slice(0, number).map(item => {
        return `  <div class="product-item product-item_${item.id}">
        <div class="thumb">
            <div class="neo">${item.hot_id == 0 ? 'hot' : 'sale of'}</div>
           <img src="${item.img}" alt="">
        </div>
        <div class="product-details">
         <h3 class="name">${item.name}</h3>
          <p class="price">${item.price}</p>
          <div class="position">
              <div class="contry">${item.contry}</div>
              <div class="date">${item.date}</div>
          </div>
        </div>
    </div>`
    })
    eProdusts.innerHTML = html.join('')
}
//SEARCH 
const eSearch = document.querySelector('header input[type="search"]')
eSearch.onfocusout = function (e) {
    const eRemove = document.querySelector('.show-item-search')
    if (eRemove !== null) {
        eRemove.remove()
    }

}
eSearch.onkeyup = function (e) {
    let val = this.value
    const eRemove = document.querySelector('.show-item-search')
    if (eRemove !== null) {
        eRemove.remove()
    }
    searchPets(val)
}
function searchPets(val) {
    getUri('http://localhost:3000/pets')
        .then(data => {
            let results = data.filter(item => {
                return item.name.includes(val)
            })
            let htmls = results.map(item => {
                return `<li class="search-item"> ${item.name}</li>`
            })
            var ul = document.createElement("ul");
            ul.classList = "show-item-search"

            // Create a <button> element
            ul.innerHTML = htmls.join('')                  // Insert text
            document.querySelector('header .col-md-6').append(ul)
        })
}

//VIEWMORE
const eViewMore = document.querySelector('.viewmore')
eViewMore.onclick = function (e) {
    getUri('http://localhost:3000/pets')
        .then(data => {
            loadOfNumber(data.length, data)

        })
        .then(()=>{
            this.remove()
        })
}