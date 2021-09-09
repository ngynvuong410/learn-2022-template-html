export const url = {
    "shop":"http://localhost:3000/shop",
    "menu":"http://localhost:3000/menu",
    "slider":"http://localhost:3000/slider",
    "poster":"http://localhost:3000/poster",
    "products":"http://localhost:3000/products",

}
export const  getData = function(url){
   return  fetch(url)
   .then(response => response.json())
}
