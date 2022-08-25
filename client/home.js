const button = document.querySelector("#test-emit")
const number = document.querySelector("#number")

const socket = window.socket
const elOptions = document.querySelectorAll(".option")
const elButtonSubmit = document.querySelector("button[type='submit']")

let selectedValue = ""

socket.on("test-aje", (args) => {  
  console.log(args)
})

socket.on("add-number", (args) => {  
  if(number) number.textContent = args.number
})

button?.addEventListener("click", () => {
  socket.emit("test-aje", { number: +number.textContent.trim() })
})

elOptions.forEach(option => {
  option.addEventListener("click", function() {
    setOptionActive(this)
  })
})

elButtonSubmit.addEventListener("click", function(){
  submitOption()
})

function setSelectedValue(value){
  selectedValue = value
}

function setOptionActive(el){
  const removalClasses = ["shadow-[4px_4px_10px_2px_rgba(0,0,0,.06)]", "overflow-hidden"]
  const additionalClasses = ["shadow-[8px_8px_0px_2px_rgba(0,0,0,.2)]", "overflow-visible"]  

  removalClasses.length == additionalClasses.length && removalClasses.forEach((rClass, key) => {    

    el.classList.remove(rClass)
    el.classList.add(additionalClasses[key])    

    const otherOptions = document.querySelectorAll(`.option:not([data-value='${el.getAttribute("data-value")}'])`)
    otherOptions.forEach(oOption => {
      oOption.classList.remove(additionalClasses[key])
      oOption.classList.add(rClass)
    })
  })

  showText(el.getAttribute("data-value"))
  enableButton()
  setSelectedValue(el.getAttribute("data-value"))
}

function showText(value){
  const removalClasses = ["opacity-0", "translate-y-6"]
  const additionalClasses = ["opacity-1", "translate-y-2"]

  const elText = document.querySelector(`h4[data-text-value='${value}']`)

  removalClasses.length == additionalClasses.length && removalClasses.forEach((rClass, key) => {
    elText.classList.remove(rClass)
    elText.classList.add(additionalClasses[key])

    const otherTexts = document.querySelectorAll(`h4:not([data-text-value='${value}'])`)
    otherTexts.forEach(oText => {
      oText.classList.remove(additionalClasses[key])
      oText.classList.add(rClass)
    })
  })
}

function enableButton(){
  elButtonSubmit.removeAttribute("disabled")
}

function submitOption(){
  socket.emit("submit-option", { option: selectedValue })
}