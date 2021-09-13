import { postData, url, getData } from '../js/common.js'
  // LOAD INFO 
  ; (function () {

    const eInfo = document.querySelector('.info-product ')
    if (sessionStorage.getItem('valJson') !== null) {
      let [val] = JSON.parse(sessionStorage.getItem('valJson'))

      let html = `<div class="box-wapper-2">
     <div class="box-left box-item">
        <div class="thumb">
          <img src="${val.img[0]}" alt="">
        </div>
     </div>
     <div class="box-right box-item">
        <h3 class="title">${val.name}</h3>
        <p class="price">${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(val.pirce)}đ</p>
         <p class="guide txt ">Hướng dẫn chọn size</p>
         <div class="box-wapper-3-small">`;
      html += val.imgmalls.map(item => {
        return `<img data-imgmalls=${item.id} src="${item.img}" alt="">`
      }).join('');

      html += `
           
         </div>
         <div class="box-quatity">
          <p class=" txt ">color :</p>
          <div class="box-wapper-2">
              <div class="size">`;
      html += val.size.map(item => {
        return `<p data-size=${item}>${item}</p>`
      }).join('');
      html += `
                 
              </div>
            <input type="number" value="1" id="quantity" name="quantity" min="1" max="5">
          </div>
         
         </div>
          <div class="box-wapper-2 add-cart-list">
               <button class="add-cart button button-red "> ADD CART</button>
               <button class="buy-now button">Buy now</button>
          </div>
          <button class="add-cart button button-fullwidth "> Đang có tại các cửa hàng</button>
     </div> 
</div>`;
      eInfo.innerHTML = html
    }
  })()
//Event click ckan color 
var productCkeck = {}
const imgShow = document.querySelector('.box-left img')
const imgSmall = document.querySelectorAll('.box-wapper-3-small img')
imgSmall.forEach(element => {
  element.onclick = function (e) {
    const eStyle = document.querySelector('[style]')
    if (eStyle !== null) {
      eStyle.removeAttribute('style')
    }

    imgShow.src = element.src
    element.style.border = '1px solid red'
    //get element value
    productCkeck['img'] = element.getAttribute("src")


  }
})
const listSize = document.querySelectorAll('.size p')
listSize.forEach(element => {
  element.onclick = function (e) {
    const eStyle = document.querySelector('.size [style]')
    if (eStyle !== null) {
      eStyle.removeAttribute('style')
    }
    productCkeck['data-size'] = element.getAttribute("data-size")
    element.style.border = '1px solid red'
  }
})

//ADD CART 
const eAddCart = document.querySelector('.add-cart')
eAddCart.onclick = function (e) {

  e.preventDefault()
  if ((Object.keys(productCkeck).length === 0 && productCkeck.constructor === Object) || Object.keys(productCkeck).length < 2) {
    confirm("please check size and color !")
  } else {

    //add cart
    let [val] = JSON.parse(sessionStorage.getItem('valJson'))
    productCkeck.quantity = document.querySelector('[type="number"]').value

    addCart(productCkeck, val)
  }
}
function addCart(val, orginvalue) {

  // add cart for data
  getData(url.Carts)
    .then(function (data) {
      if (data.length > 0) {
        const element = document.querySelector('.cart-product-warpper')
        renderCartHtmls(data, element)
        //show popup
        document.querySelector('.main-wapper').classList.add('overlay')
        document.querySelector('.popup-carts').style.display = 'block'
        const eExits = document.querySelector('.exits')
        eExits.onclick = function () {
          document.querySelector('.main-wapper.overlay').classList.remove('overlay')
          document.querySelector('.popup-carts').style.display = 'none'
        }
      }
      let ischeck = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].id_product == orginvalue.id) {
          ischeck = true
        }
      }
      if (!ischeck) {
        let cart = {}
        cart.id_product = orginvalue.id
        cart.name = orginvalue.name
        cart.img = val['img']
        cart.size = val['data-size']
        cart.quantity = val.quantity
        cart.price = orginvalue.pirce
        cart.total = Number.parseInt(val.quantity) * Number.parseInt(orginvalue.pirce)
        postData(url.Carts, cart, "POST")
          .then((data) => {

            confirm('add cart suseccfully! ')
          });
      } else {
        confirm("do you want edit ?")
      }
      return data
    })
    .then(function (data) {
      const eRemove = document.querySelectorAll('.remove')
      eRemove.forEach(element => {
        element.onclick = function (e) {
          const id = this.getAttribute('data-id')
          deleteCartItem(id)
        }
      })
      return data
    })
    .then(data => {
      //onckane input quantity
      const eQuantity = document.querySelectorAll('.quatity input')
    
         eQuantity.forEach(element=>{
        
           element.onchange = function () {
            const NodeParent = this.parentNode.parentNode
              const price = Number.parseInt(NodeParent.querySelector('.cart-price').getAttribute('data-price'))
              let resultPrice = price * Number.parseInt(this.value)
              NodeParent.querySelector('.total-money').innerHTML=new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(resultPrice)
               const id= NodeParent.classList[1].replace('cart-item_','')
              const [objResult] = data.filter(item=>item.id==id)
           
              objResult.quantity = this.value
              objResult.total = resultPrice 
              editCartItem(id,objResult)
         
           }
         })
    })

}

function editCartItem (id, data) {
 postData(url.Carts+id,data,"PUT")
 .then(data=>{
   console.log(data);

 })
}
function deleteCartItem(id) {
  fetch(url.Carts + id, {
    method: 'DELETE',
  })
    .then(res => res.text()) // or res.json()
    .then(res => confirm('Deleted item cart'))
}
function renderCartHtmls(data, element) {

  const manyToPain = document.querySelector('.total')
  let many = 0;
  const htmls = data.map(item => {
     many += item.total
    return `<div class="cart-item cart-item_${item.id} ">
    <img src="${item.img}" alt="">
    <div class="cart-name">${item.name}</div>
    <div data-price = ${item.price} class="cart-price">${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.price)}</div>
    <div class="quatity"><input type="number" min="1"  max="99" value =${item.quantity} /></div>
     <div class="total-money">${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.total)}</div>
     <button data-id=${item.id} class="remove">X</button>
</div>`
   
  })
   manyToPain.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(many)
  element.innerHTML = htmls.join('')
}

