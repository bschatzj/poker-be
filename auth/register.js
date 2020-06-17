const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const tokens = require("./token.js");
const db = require("../dbconfig");

router.post("/register", (req, res) => {
  const user = req.body;
  //console.log(req.body)

  if (!user.username || !user.password || !user.email) {
    res.status(400).json({
      error: "Missing a required field"    
    });
  } else {
    const hashed = bcrypt.hashSync(user.password, 10);
    user.password = hashed;
    //console.log(user)
    db("users")
      .insert(user)
      .then(ids => {
        const id = ids[0];
        db("users")
          .where({ id })
          .first()
          .then(user => {
            const token = tokens.generateToken(user);
            res
              .status(201)
              .json({ id: user.id, username: user.username, token });
          })
          .catch(error => {
              //console.log(error)
            res.status(500).json({
              error: "Couldn't add to database"
            });
          });
      })
      .catch(error => {
        //        console.log(error.message)
        res.status(400).json({
          error: "Must have a unique username!",
          response: error.response
        });
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      error: "Please provide a username and password."
    });
  } else {
    db("users")
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokens.generateToken(user);
          res
            .status(200)
            .json({ message: `${user.username} is logged in.`, username: user.username, id: user.id, token });
        } else {
          res.status(401).json({
            error: "Please provide the correct username and password."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while logging in."
        });
      });
  }
});

module.exports = router;