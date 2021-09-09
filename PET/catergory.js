import { getUri } from './common.js'
let ID = null
window.onload = function () {
  // code
  if (document.cookie !== null) {
    ID = Number.parseInt(document.cookie.replace('dataID_', ''))
  }
};

function run() {
  getUri('http://localhost:3000/pets')
    .then(data => {
      let eCaProduct = document.querySelector('.catergory_products')
      let result = data.filter(item => {
        return item.catergoryID == ID
      })
      let html = result.map(item => {
        return `<div class="card mb-3">
            <img class="card-img-top" src="${item.img}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title"> ${item.name}</h5>
              <p class="card-text"> <b> <i>Giá :</i></b>  ${item.price}</p>
              <p class="card-text"><b> <i>Country :</i></b> ${item.contry}</p>
              <p class="card-text"><small class="text-muted"><b> <i>Date :</i></b>  :${item.date}</small></p>
            </div>
          </div>`
      })
      eCaProduct.innerHTML = html.join('')
    })
}
//SEARCH MUTIL PETS
function searchMutil(vals) {
  //SEACR FROM DATA OF THIS PAGE OF CATERGORY
  getUri('http://localhost:3000/pets')
    .then(data => {
      //fiter data follow catergoryID
      let result = data.filter(item => {
        return item.catergoryID == ID
      })
      return result
    })
    .then(data => {
      let petsName = vals[1]["search-pets"]
      let area = Number.parseInt(vals[0]["inputGroupSelect02"])//NAN
      let petType = Number.parseInt(vals[3]["inputGroupSelect01"])//NAN
      let priceRange = Number.parseInt(vals[2]["formControlRange"])

      // console.table({ petsName, area, petType, priceRange });
     
      let hasFilters={}
       hasFilters["price"]=priceRange
      if(petsName!==''){
        hasFilters["name"]=petsName
      }
      if(!isNaN(area)){
      
        hasFilters["id_country"]=area
      }
      if(!isNaN(petType)){
        hasFilters["pet_type"]=petType
      }
 
      for (const property in hasFilters) {
     
         if(property=="pet_type"){
          data =data.filter(item=>{
            return item.pet_type==hasFilters.pet_type
          })
         }
         if(property=="id_country"){
          data =data.filter(item=>{
            return item.id_country==hasFilters.id_country
          })
         }
         if(property=="name"){
          data =data.filter(item=>{
            return item.name.includes(hasFilters.name)
          })
         }
      }
       
        let eCaProduct = document.querySelector('.catergory_products')
        let html = data.map(item => {
          return `<div class="card mb-3">
              <img class="card-img-top" src="${item.img}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"> ${item.name}</h5>
                <p class="card-text"> <b> <i>Giá :</i></b>  ${item.price}</p>
                <p class="card-text"><b> <i>Country :</i></b> ${item.contry}</p>
                <p class="card-text"><small class="text-muted"><b> <i>Date :</i></b>  :${item.date}</small></p>
              </div>
            </div>`
        })
        eCaProduct.innerHTML = html.join('')
    })

}
function getMutilValue(arr) {
  const vals = arr.map(function (item) {
    return { [item.id]: item.value }
  })
  return vals

}
//GET ELEMENT DOM
const eSearchPets = document.querySelector('#search-pets')
const eSearchTypePets = document.querySelector('#inputGroupSelect01')
const eSearchCountry = document.querySelector('#inputGroupSelect02')
const eRange = document.querySelector('#formControlRange')
const arrayE = [eSearchCountry, eSearchPets, eRange, eSearchTypePets]
arrayE.forEach(element => {
  element.onchange = function (event) {
    const vals = getMutilValue(arrayE)
      searchMutil(vals)
  }
});
//Range
eRange.onchange = function(){
                 // Insert text
    document.querySelector('#load-range').innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(eRange.value)
}

//RUN
run()
