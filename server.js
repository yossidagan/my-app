const express = require("express");
const app = express();
const port = 4000;
const api = require("./server/routes/api");
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const config = require("config");

let io = require("socket.io")(server);

app.use(express.json());

app.use("/", api);

app.get("/", (req, res) => res.send("Server up"));

io.on("connection", socket => {
  console.log("A user has conneted");

  socket.on("SEND_MESSAGE", msg => {
    console.log("msg ", msg);

    io.emit("RECEIVE_MESSAGE", msg);
  });
});

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

server.listen(port, () => console.log(`listening on port ${port}!`));
