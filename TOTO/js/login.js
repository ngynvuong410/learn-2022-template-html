import { getData, postData, url } from "./common.js"
const user = JSON.parse(localStorage.getItem("USER"))
let idxStarActive = 0
  ; (function () {

    const eButton = document.querySelector(".loggin button")
    const eShowLogin = document.querySelector(".compound-logon")
    const formLoin = document.querySelector(".body-loin ")
    const submit = document.querySelector(".body-loin .button")
    if (user !== null) {
      showHideFormValid()
      //load review 

      getData(url.evaluates)
        .then(data => {
          const [result] = data.filter(item => item.id_user == user[0].id)
          let htmlRated = ''
          for (let index = 0; index < result.rated; index++) {
            htmlRated += `<i class="fa fa-star-half-o" aria-hidden="true" style="color: orange;"></i>`

          }

          document.querySelector('.info-evaluate').innerHTML = `<span>${result.reviews.length}
          </span> reviews of <span style="color:green;font-size:2rem;padding:0">${user[0].username}</span>           `
          const reviews = result.reviews.map((item, idx) => `<div class="review"><span style="font-weight:600">${user[0].username}</span> : ${item}  ${htmlRated} <span>${result.date[idx]}</span></div> 
          `)
          var div = document.createElement("div");   // Create a <button> element
          div.classList.add('review-wpp')
          div.innerHTML = reviews.join('');                   // Insert text
          document.querySelector('.list-tabs .info-evaluate').appendChild(div);
        })
    }
    eButton.onclick = function (e) {
      eShowLogin.style.display = "block"
    }
    submit.onclick = function (e) {
      let [eUser, ePass] = formLoin.querySelectorAll("input")
      if (ePass.value == "" || eUser.value == "") {
        confirm("Please ckeck User or password emty!")
      } else {

        if (user === null) {
          isCkeckUser(eUser.value, ePass.value)
          confirm('wellcom ' + eUser.value)
          window.location.reload()
        }
      }
    }
  })()

function isCkeckUser(user, pass) {
  getData(url.users)
    .then(data => {
      const item = data.filter(function (item) {
        return item.username == user && item.pass == pass
      })
      if (item.length > 0) {

        localStorage.setItem("USER", JSON.stringify(item))

      } else {
        confirm("Please ckeck User or password is invalid!")
      }
    })
}
function showHideFormValid() {
  const loginActive = document.querySelector('.loggin.active')
  const hasUser = document.querySelector('.has-login')
  const loginForm = document.querySelector('.compound-logon')
  loginActive.classList.remove('active')
  hasUser.classList.add('active')
  loginForm.style.display = "none"
}
; (function () {
  const allStar = document.querySelectorAll('.star i')
  allStar.forEach((e, idx) => {
    e.onmouseover = function (e) {
      let eStarFirst = document.querySelector('.star i')
      for (let index = 0; index < idx + 1; index++) {
        eStarFirst.classList.add('st-hover')
        eStarFirst = eStarFirst.nextElementSibling

      }
    }
    e.onmouseout = function (e) {
      const hasStarHover = document.querySelectorAll('i.st-hover')
      hasStarHover.forEach(element => element.classList.remove('st-hover'))
    }
    e.onclick = function (event) {

      const hasStarActive = document.querySelector('i.active')
      allStar.forEach(item => item.style.color = "")
      hasStarActive !== null ? hasStarActive.classList.remove('active') : ""

      this.classList.add('active')
      for (let index = 0; index <= allStar.length; index++) {

        if (allStar[index].className.includes('active')) {
          idxStarActive = index + 1
          allStar[index].style.color = "orange"
          break
        } else {
          allStar[index].style.color = "orange"
        }

      }

    }

  })
})()

function sendEvaluate() {
  const eSend = document.querySelector('.send-to')
  eSend.onclick = function (e) {
    const review = document.querySelector('textarea')
    if (review.value == '' || idxStarActive == 0) {
      confirm('Please check star and text comment !')
    } else {
      // sendEmail()
      //Add review in server
      getData(url.evaluates)
        .then(data => {
          const date = new Date()
          const time = date.getHours() + ':' + date.getMinutes() + '\'-' + date.getUTCDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())

          const [result] = data.filter(item => item.id_user == user[0].id)
          result.date.push(time)
          result.reviews.push(review.value)
          result.rated = result.rated < idxStarActive ? idxStarActive : result.rated
          //PUT UPDATE
          postData(url.evaluates + result.id, result, 'Put')
            .then(data => console.log(data))
        })

    }
  }
}
sendEvaluate()
function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "Min",
    Password: "minhvuong2410",
    To: 'vuongm910@gmail.com',
    From: "vuongm2410@gmail.com",
    Subject: "<email subject>",
    Body: "<email body>",
  }).then(
    message => alert("mail sent successfully")
  );
}