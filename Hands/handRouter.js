const express = require("express");
const router = express.Router();
const helpers = require("./handHelpers");


router.get("/:id", (req, res) => {
    id = req.params.id
    console.log(id)
    helpers.getUserHand(id)
    .then(hands => {
        res.status(200).json(hands)
    })
})

router.post('/session', (req, res) => {
    helpers.addHand(req.body)
    id = req.body.id
    helpers.getUserHand(id)
    .then(hands => {
        res.status(200).json(hands)
    })
})

 

module.exports = router;