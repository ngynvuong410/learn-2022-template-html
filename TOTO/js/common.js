export const url = {
    "shop":"http://localhost:3000/shop",
    "menu":"http://localhost:3000/menu",
    "slider":"http://localhost:3000/slider",
    "poster":"http://localhost:3000/poster",
    "products":"http://localhost:3000/products",
    "nesw":"http://localhost:3000/news",
     "Carts":"http://localhost:3000/carts/",
     "users":"http://localhost:3000/users/",
     "evaluates":"http://localhost:3000/evaluates/",
      "country":"http://localhost:3000/vietnam/"

}
export const  getData = function(url){
   return  fetch(url)
   .then(response => response.json())
}
export function slideRunAuto(classitem,time) {
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
export async function postData(url, data,method ) {
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