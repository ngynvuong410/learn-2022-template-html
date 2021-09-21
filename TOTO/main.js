import { getData, url, slideRunAuto } from "./js/common.js"


  // Function iife auto call
  ; (function () {
    // all your code here
    slideRunAuto('.carouzel-item', 4000)
  })();
//Load avata 
(function () {
  getData(url.shop)
    .then(data => {

      const eAvata = document.querySelector('.logo img')
      const phoneNumber = document.querySelector('.phone-number')
      eAvata.src = data[0].avata
      phoneNumber.textContent = data[0].phone
    })
}());

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
  //load slider
  ; (function () {
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
  })()
  //  Load poster
  ; (function () {
    getData(url.poster)
      .then(data => {
        const colections = document.querySelector('.colections')
        const arrType2 = []
        const htmls = data.map(item => {
          if (item.bannertype == 1) {
            return `<div class="colections-item colections-item_${item.id}">
            <div class="thumb">
                <img src="${item.img}" alt="">
            </div>
        </div>`
          }
          else {
            arrType2.push(item)
          }
          return ''

        })
        colections.innerHTML = htmls.join('')
        return arrType2
      })
      .then(data => {
        const mainposter = document.querySelector('.poster-main')
        const listProduct = document.querySelector('.list-products')
        const itemMainPoster = data.filter(item => item.mainposter == true)
        mainposter.innerHTML = `<div class="thumb"> 
      <img src="${itemMainPoster[0].img}" alt="">
  </div>`
        const htmls = data.map(item => {
          if (!item.mainposter) {
            return `<div class="product-item product-item_${item.id}"><img src="${item.img}" alt=""></div>`
          }
          return ''
        })
        listProduct.innerHTML = htmls.join('')
      })
  })()
  //Load products
  ; (function () {
    getData(url.products)
      .then(data => {
        const colectionProducts = document.querySelector('.colection-products')

        const htmls = data.map((item) => {

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
        colectionProducts.innerHTML = htmls.join('')
        return data //promise return for then below use again
      })
      .then(function (data) {
        $('.product-item .thumb').slick({

          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000

        });
        //when has data then load slick
        $('.colection-products').slick({
          slidesPerRow: 4,
          arrows: false,
          rows: 2

        });
        return data //promise return for then below use again
      })

  })()

  // Load news 
  ; (function () {
    getData(url.nesw)
      .then(data => {
        const eHot = document.querySelector('.news-slider')
        const eNewsSmall = document.querySelector('.list-news-content')
        const newsHot = data.filter(item => item.hot == true)
        const htmlsHot = newsHot.map(item => {
          return `<div class="slider-item slider-item_${item.id}">
        <div class="thumb"><img src="${item.img}" alt=""></div>
        <div class="content">
            <h3 class="title green">${item.title}</h3>
            <p>${item.description}</p>
        </div>
    </div>`
        })
        eHot.innerHTML = htmlsHot.join('')
        //load news small
        const htmlsSmall = data.map(item => {
          if (!item.hot) {
            return `<div class="list-news-item">
         <div class="thumb"><img src="${item.img}" alt=""></div>
         <div class="content">
             <h4>${item.title}</h4>
             <p class="date">${item.date}</p>
             <p class="plud">${item.plug}</p>
         </div>
     </div>`
          }
          return ''
        })
        eNewsSmall.innerHTML = htmlsSmall.join('')
      })
      .then(function () {
        $('.news-slider').slick({
          slidesPerRow: 4,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000


        });
      })
  })()

//onclick menu category
const menu = document.querySelector('.nav-box')
menu.onclick = function (e) { 
   const eItem=e.target.closest('.nav-item ')
   const id = eItem.classList[1].replace('nav-item_','')
   sessionStorage.setItem("CATEGORY_ID", JSON.stringify({"id":id,"name":eItem.textContent}));
  window.location.href = window.location.origin + '/caegory.html'
}
