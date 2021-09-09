export function getUri (url){
    return fetch(url)
  .then(response => response.json())
 }
 //THIS IS PROMISE LOAD COMMON FOR ALL PAGE BECAUSE IT USE AGAIN and is will not catch error
 getUri("http://localhost:3000/menu")
.then(data=>{
    
    let emenu = document.querySelector('.menu')
    let html =  data.map((item,idx)=>{
        return `<li class="menu-item menu-item_${item.id}">
        <span>${item.name}</span>
        <ul class="menu-sub">`
   
        +
        item.menu_sub.map(item=>`<li class="sub-item sub-item_${item.id}">${item.name}</li>` ).join('')
        + 
        `   </ul>
        </li>`                      
    })
    if(emenu!==null){
        emenu.innerHTML = html.join('')
    }
  
})

//UPDATE DATA
export async function postData(url = '', method,data = {}) {
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
//Login auto 
if(localStorage.getItem('info_User')!==null){

    let user = JSON.parse(localStorage.getItem('info_User'))  
    let eLogin = document.querySelector('.info-item:last-child')
     eLogin.querySelector('span').innerText=user.email
}

var eLogin = document.querySelector('.info .info-item:last-child')
eLogin.onclick = function (e) {
 window.location.href = 'http://127.0.0.1:5500/signIn.html'  
}