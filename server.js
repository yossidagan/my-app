const express = require("express");
const app = express();
const port = 3000;
const server = require("http").createServer(app);
let io = require("socket.io")(server);

app.get("/", (req, res) => res.send("Server up"));

io.on('connection', socket => {
    console.log("A user has conneted")
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
}); 

server.listen(port, () => console.log(`listening on port ${port}!`));
