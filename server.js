const express = require("express");
const app = express();
const port = 4000;
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const server = require("http").createServer(app);


let io = require("socket.io")(server);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', api)

app.get("/", (req, res) => res.send("Server up"));


io.on("connection", socket => {
  console.log("A user has conneted");

  socket.on("SEND_MESSAGE", msg => {
    console.log("msg ", msg);

    io.emit("RECEIVE_MESSAGE", msg);
  });
});

const db = require('./config/keys').mongoURI

mongoose.connect(db)
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err))

server.listen(port, () => console.log(`listening on port ${port}!`));
