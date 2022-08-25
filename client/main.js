import { io } from 'socket.io-client'
const socket = io("http://localhost:3000");

window.socket = socket

socket.on("connect", () => {
  setData("init", getData())
})

window.getData = () => {
  return JSON.parse(localStorage.getItem("data-stats"))
}

window.setData = (type="init", newData=null) => {
  const data = getData()

  if(!data && !newData && type == "init"){
    localStorage.setItem("data-stats", JSON.stringify([
      {type: "Nintendo Switch", value: 0},
      {type: "Playstation 4", value: 0},
      {type: "Playstation 5", value: 0},
      {type: "Xbox Series X", value: 0},
    ]))
  } else {
    localStorage.setItem("data-stats", JSON.stringify(newData))
  } 
}

