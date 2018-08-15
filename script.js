var cont = document.getElementsByClassName('container')[0]
var all = document.getElementsByClassName('alerts')[0]
var current = document.getElementsByClassName('current')[0]
var total = document.getElementsByClassName('total')[0]
var pBtn = document.getElementsByClassName('prev')[0]
var nBtn = document.getElementsByClassName('next')[0]
var slide = 1

function prev(){
  console.log('prev button clicked!')
  if(
    all.style.left !== "0px" && 
    all.style.left !== ""
  ){
    slide -= 1
    current.innerHTML = slide
    all.style.left = Number(all.style.left.slice(0,-2)) + all.offsetWidth/all.children.length + 'px'
  }
}
function next(){
  console.log('next function clicked!')
  if(
    all.style.left !== "-" + (all.offsetWidth - all.offsetWidth/all.children.length) + "px"
  ){
    slide += 1
    current.innerHTML = slide
    all.style.left = Number(all.style.left.slice(0,-2)) - all.offsetWidth/all.children.length + 'px'
  }
}
function reset(){
  console.log('resize event fired!')
  all.style.left = "0px"
}
function init(){
  current.innerHTML = slide
  total.innerHTML = all.children.length
}

pBtn.addEventListener('click',prev)
nBtn.addEventListener('click',next)
window.addEventListener('resize',reset)

init()