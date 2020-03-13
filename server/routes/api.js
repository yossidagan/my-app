const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/sanity", (req, res) => {
  res.send("OK!");
});

router.get('/getUsers', (req, res) => {
    User.find().
    then(users => res.send(users))

})

router.post("/saveUser", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  newUser.save().then(user => res.json(user));
});



module.exports = router;
