const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const auth = require("../../../middleware/auth")

const User = require("../../models/User");

router.get("/sanity", (req, res) => {
  res.send("OK!");
}); 

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/authUser", (req, res) => {
console.log('here5')
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
          { expiresIn: 36000 },
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
