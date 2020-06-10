const express = require("express");
const router = express.Router();
const helpers = require("./handHelpers");
const db = require("../dbconfig");



router.get("/:id", (req, res) => {
    id = req.params.id
    console.log(id)
    helpers.getUserHand(id)
    .then(hands => {
        res.status(200).json(hands)
    })
})

router.post('/session', (req, res) => {
    console.log(req)
    const hand = req.body
    const id = req.body.id
    db("hands")
      .insert(hand)
      .then(ids => {
        db("hands")
          .where({ id })
          .then(user => {
            res
              .status(201)
              .json(user);
          })
          .catch(error => {
              console.log(error)
            res.status(500).json({
              error: "Couldn't add to database"
            });
          });
      })
})

 

module.exports = router; 