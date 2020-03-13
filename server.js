const express = require("express");
const app = express();
const port = 4000;
const server = require("http").createServer(app);
let io = require("socket.io")(server);

app.get("/", (req, res) => res.send("Server up"));

io.on("connection", socket => {
  console.log("A user has conneted");

  socket.on("SEND_MESSAGE", msg => {
    console.log("msg ", msg);

    io.emit("RECEIVE_MESSAGE", msg);
  });
});

server.listen(port, () => console.log(`listening on port ${port}!`));
