import { getData, postData, url } from './common.js'
const slCounTry = document.querySelector('#country')
const slDictrict = document.querySelector('#dictric')
  //Load data of country 
  ; (function () {
    getData(url.country)
      .then(data => {
        slCounTry.innerHTML = (data.map((item, idx) => `<option value="${idx}">${Object.keys(item)}</option>`)).join('')
        return data
      })
      .then(data => {
        slCounTry.onchange = function (e) {
          const valOptionId = slCounTry.options[slCounTry.selectedIndex].value
          const valOptionText = slCounTry.options[slCounTry.selectedIndex].textContent
          const result = data[valOptionId]
          slDictrict.innerHTML = (result[valOptionText].map(item => `<option value="${item.zipcode}">${item.name}</option>`)).join('')
        }
      })
  })()
  //Load cart info
  ; (function () {
    const cart = document.querySelector('.cart-info .body')
    const provisinal = document.querySelector('.money-fetch')
    getData(url.Carts)
      .then(data => {

        const htmls = data.map(item => {
          return `<div class="item">
    <div class="thumb">
        <img src="${item.img}" alt="">
         <p>Size:${item.size}</p>
    </div>
    <div class="quan">
       ${item.quantity}
    </div>
    <div class="price">${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.total)}</div>
</div>`
        })
        cart.innerHTML = htmls.join('')
        //provisional money 
        const money =data.reduce(function (valsave,valcurrent) {  
           
          return valsave +valcurrent.total
       },0)
         provisinal.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(money)
      })
  })()