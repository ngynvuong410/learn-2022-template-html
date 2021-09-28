export const url = {
  "shop": "https://toto-shop.herokuapp.com/shop",
  "menu": "https://toto-shop.herokuapp.com/menu",
  "slider": "https://toto-shop.herokuapp.com/slider",
  "poster": "https://toto-shop.herokuapp.com/poster",
  "products": "https://toto-shop.herokuapp.com/products",
  "nesw": "https://toto-shop.herokuapp.com/news",
  "Carts": "https://toto-shop.herokuapp.com/carts/",
  "users": "https://toto-shop.herokuapp.com/users/",
  "evaluates": "https://toto-shop.herokuapp.com/evaluates/",
  "country": "https://toto-shop.herokuapp.com/vietnam/"

}
export const getData = function (url) {
  return fetch(url)
    .then(response => response.json())
}
export function slideRunAuto(classitem, time) {
  //SLIDER 

  const eLast = document.querySelector(`${classitem}:last-child`)
  setInterval(() => {
    let eActive = document.querySelector(`${classitem}.active`)
    if (eActive == eLast) {
      eActive = document.querySelector(`${classitem}:first-child`)
      eActive.classList.add('active')
      eLast.classList.remove('active')
    }
    else {
      let eNext = eActive.nextElementSibling;
      if (eNext == null) {
        eNext = document.querySelector(`${classitem}:first-child`)
      }
      eActive.classList.remove('active')
      eNext.classList.add('active')
    }

  }, time);

}
export async function postData(url, data, method) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
  //load slider
 export function loadSikder () {
  getData(url.slider)
    .then(data => {
      const eSlider = document.querySelector('.carouzel')
      const htmls = data.map((item, idx) => {
        let active = ''
        if (idx == 0) {
          active = 'active'
        }
        return `<div class="carouzel-item ${active}">
                <img src="${item.img}" alt="">
            </div>`
      })
      eSlider.innerHTML = htmls.join('')
    })
}
  //Load avata 
;(function () {
  getData(url.shop)
    .then(data => {

      const eAvata = document.querySelector('.logo img')
      const phoneNumber = document.querySelector('.phone-number')
      eAvata.src = data[0].avata
      phoneNumber.textContent = data[0].phone
    })
}());
 // Function iife auto call
 ; (function () {
  // all your code here
  slideRunAuto('.carouzel-item', 4000)
})();
//  Load menu 
(function () {
  getData(url.menu)
    .then(data => {
      const eMenu = document.querySelector('.nav-box')
      const htmls = data.map(item => {
        return `<div class="nav-item nav-item_${item.id}">${item.name}</div>`
      })
      eMenu.innerHTML = htmls.join('')
    })
})()

//product onclick - fix when data genarter after
//redirect page 

const products = document.querySelector('.colection-products')
products.onclick = function (e) {
  const productItem = e.target.closest('.product-item') //closest check it and parent of it has class .return nodeE or null
  if (productItem) {
    const id = productItem.classList[1].replace('product-item_', '')
    getData(url.products)
    .then(data=>{
      const valJson = JSON.stringify(data.filter(item=>item.id==id))
      sessionStorage.setItem("valJson", valJson);
      window.location.href = window.location.origin + '/productDetail.html'
    })
   
  }
}

//onclick menu category
const menu = document.querySelector('.nav-box')
menu.onclick = function (e) { 
   const eItem=e.target.closest('.nav-item ')
   const id = eItem.classList[1].replace('nav-item_','')
   sessionStorage.setItem("CATEGORY_ID", JSON.stringify({"id":id,"name":eItem.textContent}));
  window.location.href = window.location.origin + '/caegory.html'
}
