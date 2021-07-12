const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket object:", socket);
  console.log("Socket is active");

  socket.on("chat", (payload) => {
    console.log("Payload:", payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("Server listening at port 5000...!");
});
