import { postData, url, getData } from '../js/common.js'
var listIDDetele = []
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

function showUp() {
  //show popup
  document.querySelector('.main-wapper').classList.add('overlay')
  document.querySelector('.popup-carts').style.display = 'block'
  const eExits = document.querySelector('.exits')
  eExits.onclick = function () {
    document.querySelector('.main-wapper.overlay').classList.remove('overlay')
    document.querySelector('.popup-carts').style.display = 'none'
    //REMOVE ITEM DATA
    const isQuestion = confirm('are you sure tkis change ?')
    if (isQuestion) {
      listIDDetele.map(item => {
        deleteCartItem(item)
      })
    }

  }
}
function addCart(val, orginvalue) {

  // add cart for data
  getData(url.Carts)
    .then(function (data) {
      if (data.length > 0) {
        const element = document.querySelector('.cart-product-warpper')
        renderCartHtmls(data, element)
        showUp()
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
          const eParentNone = this.parentNode
          const eResult = document.querySelector('.total')
          const valTotal = Number.parseInt(Number(eResult.textContent.replace(/[^0-9.-]+/g, "")))
          const valmoney = Number.parseInt(Number(eParentNone.querySelector('.total-money').textContent.replace(/[^0-9.-]+/g, "")))
          eResult.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(valTotal - valmoney)


          listIDDetele.push(id)
          eParentNone.remove()

        }
      })
      return data
    })
    .then(data => {
      //onckane input quantity
      const eQuantity = document.querySelectorAll('.quatity input')

      eQuantity.forEach(element => {

        element.onchange = function () {
          const NodeParent = this.parentNode.parentNode
          const price = Number.parseInt(NodeParent.querySelector('.cart-price').getAttribute('data-price'))
          let resultPrice = price * Number.parseInt(this.value)
          NodeParent.querySelector('.total-money').innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(resultPrice)
          let listTotalMoney = document.querySelectorAll('.total-money')
          let pays = 0
          listTotalMoney.forEach(e => {
            pays += Number.parseInt(Number(e.textContent.replace(/[^0-9.-]+/g, "")))
          })
          document.querySelector('.total').innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(pays)
          const id = NodeParent.classList[1].replace('cart-item_', '')
          const [objResult] = data.filter(item => item.id == id)
          objResult.quantity = this.value
          objResult.total = resultPrice
          editCartItem(id, objResult)

        }
      })
    })

}

function editCartItem(id, data) {
  postData(url.Carts + id, data, "PUT")
    .then(data => {
      console.log(data);

    })
}
function deleteCartItem(id) {
  return fetch(url.Carts + id, { method: 'DELETE' }).then(res => res.text())
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
; (function () {
  const listhead = document.querySelectorAll('.tabs-wapper div')
  const listItems = document.querySelectorAll('.tabs-item')
  listhead.forEach((element, idx) => {
    element.onclick = function () {

      document.querySelector('.tabs-item.active').classList.remove('active')
      listItems[idx].classList.add('active')
    }
  })
})()

  ; (function () {
    if (sessionStorage.getItem('valJson') !== null) {
      let [val] = JSON.parse(sessionStorage.getItem('valJson'))
      getData(url.products)
        .then(function (data) {
          const reuslt = data.filter(item => item.cartergoryID == val.cartergoryID)
          const htmls = reuslt.map((item) => {

            let html = ` <div class="product-item product-item_${item.id}">
                 <div class="thumb">`;

            item.img.forEach((element, idx) => {
              let isActive = false;
              if (idx == 0) {
                isActive = true
              }
              html += `<img src="${element}" class="product-change ${isActive ? 'active' : ''}" alt="">`
            });

            html +=
              `<div class="content">
                        <div class="many-type">`;
            item.imgmalls.forEach(element => {

              html += `<img src="${element.img}" alt="">`
            });
            html += `
                        </div>
                    </div>
                </div>

                <div class="price">${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.pirce)}</div>
            </div>`;
            return html
          })
          const eWapper = document.querySelector('.same-category .colection-products ')
          eWapper.innerHTML = htmls.join('')
        })
    }

  })()
//sign in
const sign = document.querySelector('.sign')
const btnSign = document.querySelector('.sign-in')
sign.onclick = function () {
  document.querySelector('.body-loin').style.display = "none"
  document.querySelector('.body-sign.body-loin').style.display = "block"

}
btnSign.onclick = function () {
  const username = document.querySelector('.body-sign [type="text"]').value
  const pass = document.querySelector('.body-sign [type="password"]').value
  if (username == '' || pass == '') {
    confirm('Please check user or password!')
  } else {
    postData(url.users, { username, pass }, "POST")
      .then(() => confirm('Sign in sucseccfully!'))

  }
}
//FORGET PASSWORD
const fgPass = document.querySelector('.fg-pass')
fgPass.onclick = function (e) {
  document.querySelector('.body-loin').style.display = "none"
  document.querySelector('.forget-password').style.display = "block"
}
const btnGetPass = document.querySelector('.get-password')
btnGetPass.onclick = function (e) {
  const user = document.querySelector('.forget-password [type="text"]').value
  if (user == '') {
    confirm('Please check user !')
  } else {
    getData(url.users)
      .then(data => {
        const hasUser = data.filter(item => item.username == user)
        if (hasUser.length > 0) {
          const newPass = Math.floor(Math.random() * 10000);
          this.innerHTML = ' New Password :' + newPass
          hasUser[0].pass = newPass
          postData(url.users + hasUser[0].id, hasUser[0], 'PUT')
            .then(data => confirm('Change password succsecfully!'))
        } else {
          confirm('Please check username is invalid/!')
        }
      })

  }
}