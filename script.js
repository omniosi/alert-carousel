var allalerts = document.getElementsByClassName('alertarea')[0]
var cont = document.getElementsByClassName('container')[0]
var all = document.getElementsByClassName('alerts')[0]
var current = document.getElementsByClassName('current')[0]
var total = document.getElementsByClassName('total')[0]
var pBtn = document.getElementsByClassName('prev')[0]
var nBtn = document.getElementsByClassName('next')[0]
var slide = 1
var dataURL = 'data.json'

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
  return jsonresponse
});

function prev(){
  // console.log('prev button clicked!')
  pBtn.classList.add('disabled')
  nBtn.classList.remove('disabled')
  if(
    all.style.left !== "0px" && 
    all.style.left !== ""
  ){
    // slide -= 1
    slide--
    pBtn.classList.remove('disabled')
    all.style.left = Number(all.style.left.slice(0,-2)) + all.offsetWidth/all.children.length + 'px'
    // current.innerHTML = slide
    numUpd(slide)
  }
}
function next(){
  // console.log('next function clicked!')
  pBtn.classList.remove('disabled')
  nBtn.classList.add('disabled')
  if(
    all.style.left !== "-" + (all.offsetWidth - all.offsetWidth/all.children.length) + "px"
  ){
    // slide += 1
    slide++
    nBtn.classList.remove('disabled')
    all.style.left = Number(all.style.left.slice(0,-2)) - all.offsetWidth/all.children.length + 'px'
    // current.innerHTML = slide
    numUpd(slide)
  }
}
function numUpd(num){
  current.innerHTML = num
}
function reset(){
  // console.log('resize event fired!')
  all.style.left = "0px"
  init()
}
function init(){
  // current.innerHTML = slide
  numUpd(1)
  total.innerHTML = all.children.length
  pBtn.classList.add('disabled')
  nBtn.classList.remove('disabled')
}
function closeAlert(event){
  console.log('closeAlert called!')
  // event.target.closest('li').classList.add('disabled')
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
window.addEventListener('resize',reset)

init()