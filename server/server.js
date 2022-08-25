const allowOrigins = ["http://localhost:8081", "http://localhost:8080", "http://localhost:8082"]

const io = require("socket.io")(3000, {
  cors: {
    origin: allowOrigins
  }
})

io.on("connection", (socket) => {
  socket.emit("test-aje", {
    test: "TEST"
  })

  socket.on("submit-option", (args) => {
    io.emit("set-stats", { ...args })
  })
})