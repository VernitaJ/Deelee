const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const user = require("../models/user")
const jwt = require('jsonwebtoken');

//Registeration
router.post("/api/users", async (req, res, next) => {
    const newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      location: req.body.location,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    try {
      var savedUser = await newUser.save();
      res.status(200).json({
        savedUser,
        title: 'Signup Success' })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'email in use'
      })
    }
    });

//Login
router.post('/api/users/login', (req, res, next) => {
    user.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid credentials'
        })
      }
      //IF ALL IS GOOD create a token and send to frontend
      try {
      let token = jwt.sign({ userId: user._id}, 'secretkey');
      return res.status(200).json({
        title: 'login sucess',
        token: token
      })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'Unable To Login'
      })
    }
    })
  })
  
  //grabbing user info
  router.get('/api/user', (req, res, next) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      user.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            location: user.location,
            email: user.email,
            id: user.id
          }
        })
      })
  
    })
  })

module.exports = router;
