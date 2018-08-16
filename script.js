var allalerts = document.getElementsByClassName('alertarea')[0]
var cont = document.getElementsByClassName('container')[0]
var all = document.getElementsByClassName('alerts')[0]
var num = document.getElementsByClassName('num')[0]
var current = document.getElementsByClassName('current')[0]
var total = document.getElementsByClassName('total')[0]
var pBtn = document.getElementsByClassName('prev')[0]
var nBtn = document.getElementsByClassName('next')[0]
var mes = document.getElementsByClassName('message')[0]
var cBtn = document.getElementsByClassName('close')[0]
var slide = 1

function contDimen(){
  // span.container{ width: calc(100% - 34px - 34px - 55px); height: 34px }
  cont.style.width = (window.innerWidth - (pBtn.offsetWidth + nBtn.offsetWidth + num.offsetWidth) ) + 'px'
  cont.style.height = all.offsetHeight + 'px'

  // ul.alerts{ width: 500% }
  all.style.width = all.children.length + '00%'

  // ul.alerts li{ width: 20% }
  Array.prototype.map.call(all.children,function(l){
    return l.style.width = 100/all.children.length + '%'
  })
  // .alerts li .message{ width: calc(100% - 33px) }
  Array.prototype.map.call(document.getElementsByClassName('message'),function(m){
    return m.style.width = (m.closest('li').offsetWidth - m.nextSibling.offsetWidth) + 'px'
  })

}

function loadJSON(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'data.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xhr.responseText);
    }
  }
  xhr.send(null);
}

// Call to function with anonymous callback
loadJSON(function(response) {
  jsonresponse = JSON.parse(response);
  console.log('jsonresponse = ', jsonresponse);

  all.innerHTML = jsonresponse.map(r => {
    return '<li class="'+r.type+'"><span class="message">'+r.message+'</span><button class="close" onclick="closeAlert(event)"><i class="fas fa-times-circle"></i></button></li>'
  }).join('')
  contDimen()
  return jsonresponse
});

function prev(){
  // console.log('prev button clicked!')
  pBtn.classList.add('disabled')
  nBtn.classList.remove('disabled')
  if(
    // Number(current.innerHTML) > 1 && 
    all.style.left !== "0px" && 
    all.style.left !== ""
  ){
    slide--
    pBtn.classList.remove('disabled')
    all.style.left = Number(all.style.left.slice(0,-2)) + all.offsetWidth/all.children.length + 'px'
    numUpd(slide)
  }
}
function next(){
  // console.log('next function clicked!')
  pBtn.classList.remove('disabled')
  nBtn.classList.add('disabled')
  if(
    // Number(current.innerHTML) !== Number(total.innerHTML) && 
    all.style.left !== "-" + (all.offsetWidth - all.offsetWidth/all.children.length) + "px"
  ){
    if(slide != Number(total.innerHTML) ){
      slide++
      all.style.left = Number(all.style.left.slice(0,-2)) - all.offsetWidth/all.children.length + 'px'
      nBtn.classList.remove('disabled')
    }
    numUpd(slide)
  }
}
function numUpd(num){
  current.innerHTML = num
}
function init(){
  numUpd(1)
  total.innerHTML = all.children.length
  Array.prototype.map.call(all.getElementsByTagName('li'),function(m) {
    return m.classList.remove('hide')
  })
  all.style.left = "0px"
  pBtn.classList.add('disabled')
  nBtn.classList.remove('disabled')
  contDimen()
}
function closeAlert(event){
  console.log('closeAlert called!')
  event.target.closest('li').classList.add('hide')
  total.innerHTML--
  prev()
  exit()
}
function exit(){
  if(Number(total.innerHTML) == 0){
    allalerts.classList.add('hide')
  }
}

pBtn.addEventListener('click',prev)
nBtn.addEventListener('click',next)
window.addEventListener('resize',init)

init()