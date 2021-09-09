import {getUri,postData} from  './common.js'
var url = 'http://localhost:3000/user';
var Elogin = document.querySelector('#login-form button')
Elogin.onclick = function (event) {
     event.preventDefault()
      let email = document.querySelector('#login-form input[type="email"]').value
      let password = document.querySelector('#login-form input[type="password"]').value
       LoginSuccess({email,password})  
  }
function LoginSuccess (obj) {
    if(obj.email!==''&&obj.password!==''){
      getUri(url)
      .then(data=>{
         let result = data.filter(item=>{
           return item.username==obj.email
                &&item.password==obj.password
         })
         if(result.length >0){
             localStorage.setItem("info_User",JSON.stringify(obj))
           window.location.href ='/'
         }else{
           confirm('Login fails ! ')
         }
      })
    }else{
      confirm("please check login again @@")
    }
     
  }

//rediect to forgot form
const eForgot=document.querySelector('.forgot')
eForgot.onclick =function (e) {
     e.preventDefault();
     let eHasShow=document.querySelector('.show')
     let eFormForgot = document.querySelector('#forget-password')
     eHasShow.classList.remove('show')
     eFormForgot.classList.add('show')
   
  }
//FORGOT PASSWORD 
const ebutton =document.querySelector('#forget-password button');
ebutton.onclick =function (e) { 
  e.preventDefault();
  let valEmail = document.querySelector('#email-forgot').value
   returnPassForgot(valEmail)
 }
function returnPassForgot(val) {

  if(val!==''){
    getUri(url)
    .then(data=>{
       let ischeck =false;
        data.forEach(item=>{
          if(item.username == val){
           
            let randomPass =Math.random() * 1000
              ebutton.disabled =true
              ebutton.textContent ='This is new password of you :'+randomPass.toFixed(0)
              //SAVE PASSWORD database
         
                  item.password= randomPass.toFixed(0)
              postData(`${url}/${item.id}`, item)
                .then(data => {
                  console.log(data); // JSON data parsed by `data.json()` call
                  confirm('checkout !')
                });

               

          }
        })
  
    })
  }
}
//REGISTER  
const eRegister = document.querySelector('.question button')
const ebtnresgiter = document.querySelector('#register-form button')

eRegister.onclick = function (e) {
   e.preventDefault()
   let eHasShow=document.querySelector('.show')
   let eFormRegister = document.querySelector('#register-form')
   eHasShow.classList.remove('show')
   eFormRegister.classList.add('show')
}
ebtnresgiter.onclick = function (e) {
  e.preventDefault()
   const username = document.querySelector('#registerexampleInputEmail1').value
   const password = document.querySelector('#registerexampleInputPassword1').value
   registerValid({username,password})
  }
function registerValid (vals) {
   console.log(vals);
   if(vals.username!==''&&vals.pass!==''){
      getUri(url)
      .then(data=>{
        let ischeck =false
         data.forEach(item=>{
            if(item.username===vals.username){
                ischeck=true
            }
         })
         if(!ischeck){

         console.log( postData(url,'POST',vals));
         confirm('Register Sucsess!')
         }else{
            confirm('Resgister error!')
         }
      })
   }
}