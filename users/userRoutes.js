const express = require("express");
const router = express.Router();
const helpers = require("./userHelpers");


router.put("/update/:id", (req, res) => {
    id = req.params.id
    console.log(id)
    update = req.body
    helpers.update(id, update)

    .then(profile => {
        res.status(200).json(`user ${id}'s profile has been updated`)
    })

    .catch(error => {
        res.status(400).json(`user ${id}'s profile could not be updated `)
    })
})

router.get('/', (req, res) => {
    console.log('hi')
})

router.get("/user/:id", (req, res) => {
    id = req.params.id
    console.log(id)
    helpers.getUser(id)

    .then(profile => {
        res.status(200).json(profile)
    })

    .catch(err => {
        res.status(400).json(`could not get user ${id}'s profile`)
    })
})

router.get("/all", (req, res) => {
    helpers.getAllUsers()
    .then(users => {
        res.status(200).json(users) 
    })
    .catch(err => {
        res.status(418).json('sorry I hate backend')
    })
})



module.exports = router;