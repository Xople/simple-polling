const allowOrigins = ["http://localhost:8081", "http://localhost:8080"]

const io = require("socket.io")(3000, {
  cors: {
    origin: allowOrigins
  }
})

io.on("connection", (socket) => {
  socket.emit("test-aje", {
    test: "TEST"
  })

  socket.on("test-aje", (args) => {
    io.emit("add-number", { number: args.number + 1 })
  })
})