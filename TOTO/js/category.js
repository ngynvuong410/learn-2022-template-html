import { getData, url ,loadSikder} from "./common.js";
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const {id,name} =JSON.parse(sessionStorage.getItem('CATEGORY_ID'))
loadSikder()
;(function () {
    const cotainer = $('.colection-products ')
    const heading = $('.section-heading h3')
     heading.textContent = name
    getData(url.products)
    .then(data=>{
        const results = data.filter(item=>item.cartergoryID==id)
           render(results,cotainer)
    })
})()
function render (data,node) { 
    const htmls = data.map(item=>{
        return `<div class="product-item product-item_${item.id}">
        <div class="thumb">
            <img src="${item.img[0]}" alt="">
            <div class="content">
                <div class="many-type">
                    <img src="${item.imgmalls[0].img}" alt="">
                </div>
            </div>
        </div>

        <div class="price">${ new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.pirce)}</div>
    </div>`
    })
    node.innerHTML= htmls.join('')
 }
//view mode
const twoLine = $('.two-line')
const df = $('.df')
twoLine.onclick = function (e) { 
 const colection =$('.colection-products ')
 colection.classList.add('two-line')
 }
df.onclick = function (e) {
    if( $('.colection-products.two-line ')){
        $('.colection-products.two-line ').classList.remove('two-line')
    }
  
}
//SORT LIST 
const sltSort = $('.sort-bar')
sltSort.onchange=function (e) { 
   const val = this.value
   filterOptions(val)
}
function filterOptions(val) {
 getData(url.products)
 .then(data=>{
    let results = data.filter(item=>item.cartergoryID==id)
    const colection =$('.colection-products ')
    //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
     switch (val) {
         case 'des':
             results=results.sort(compareValues('pirce', 'desc'))
            render(results,colection)
             break;
         case 'adc':
             results=results.sort(compareValues('pirce'))
            render(results,colection)
             break;
         case 'az':
             results=results.sort(compareValues('name'))
            render(results,colection)
             break;
         case 'za':
             results=results.sort(compareValues('name','desc'))
            render(results,colection)
             break;
     
         default:
             break;
     }
 })
}
 
  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  
