import {getData,url} from "./js/common.js"
//SLIDER 
const eActive = document.querySelector('.carouzel-item.active')
const eLast = document.querySelector('.carouzel-item:last-child')

// Function iife auto call
;(function(){
    // all your code here
   setInterval(() => {
    let eActive = document.querySelector('.carouzel-item.active')
      if(eActive==eLast){
          eActive=document.querySelector('.carouzel-item:first-child')
          eActive.classList.add('active')
          eLast.classList.remove('active')
      }
       else{
        let eNext = eActive.nextElementSibling;
        if(eNext==null){
          eNext = document.querySelector('.carouzel-item:first-child')
        }
         eActive.classList.remove('active')
         eNext.classList.add('active') 
       }
       
   }, 4000);
  })();
//Load avata 
(function () { 
   getData(url.shop)
   .then(data => {
   
      const eAvata = document.querySelector('.logo img')
      const phoneNumber = document.querySelector('.phone-number')
      eAvata.src = data[0].avata
      phoneNumber.textContent=data[0].phone
    })
 }());

//  Load menu 
(function () { 
   getData(url.menu)
   .then(data=>{
      const eMenu = document.querySelector('.nav-box')
      const htmls = data.map(item=>{ 
        return `<div class="nav-item nav-item_${item.id}">${item.name}</div>`
      })
      eMenu.innerHTML = htmls.join('')
   })
 })()
 //load slider
 ;(function(){
  getData(url.slider )
   .then(data=>{
      const eSlider = document.querySelector('.carouzel')
      const htmls = data.map((item,idx)=>{ 
        let active = ''
          if(idx==0){
             active ='active'
          }
        return   `<div class="carouzel-item ${active}">
                  <img src="${item.img}" alt="">
              </div>`
      })
      eSlider.innerHTML = htmls.join('')
   })
 })() 
//  Load poster
;(function(){
    getData(url.poster)
    .then(data=>{
      const colections = document.querySelector('.colections')
      const arrType2 = []
      const htmls = data.map(item=>{ 
           if(item.bannertype==1){
            return   `<div class="colections-item colections-item_${item.id}">
            <div class="thumb">
                <img src="${item.img}" alt="">
            </div>
        </div>`
           }
           else{
             arrType2.push(item)
           }
           return ''
       
      })
      colections.innerHTML = htmls.join('')
       return arrType2
    })
    .then(data =>{
      const mainposter = document.querySelector('.poster-main')
      const listProduct = document.querySelector('.list-products')
      const itemMainPoster = data.filter(item=>item.mainposter==true)
      mainposter.innerHTML = `<div class="thumb"> 
      <img src="${itemMainPoster[0].img}" alt="">
  </div>`
      const htmls = data.map(item=>{
         if(!item.mainposter){
           return `<div class="product-item product-item_${item.id}"><img src="${item.img}" alt=""></div>`
         }
         return ''
      })
      listProduct.innerHTML=htmls.join('')
    })
})()
