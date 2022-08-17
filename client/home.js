const button = document.querySelector("#test-emit")
const number = document.querySelector("#number")

const socket = window.socket

socket.on("test-aje", (args) => {  
  console.log(args)
})

socket.on("add-number", (args) => {  
  if(number) number.textContent = args.number
})

button?.addEventListener("click", () => {
  socket.emit("test-aje", { number: +number.textContent.trim() })
})