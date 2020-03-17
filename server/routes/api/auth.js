const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")

const User = require("../../models/User");

router.get("/sanity", (req, res) => {
  res.send("OK!");
});


router.post("/authUser", (req, res) => {

  const { email, password} = req.body 
  
  if (!email || !password) {
    return res.status(400).json({ msg : "Please enter all fields"})
  }
  
    User.findOne({ email }).
    then(user => {
      if (!user) return res.status(400).json({ msg : "User does not exists"})

      bcrypt.compare(password, user.password).
      then(isMatch => {
        if (!isMatch) res.status(400).json({ msg : "Invalid Credentials"})

        jwt.sign(
          {id : user.id},
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err
            res.json({
              token,
              user : {
                id : user.id,
                email : user.email,
                password : user.password
              }
            })
        
          }
        )
      })
    


    })
  
  });



module.exports = router;
