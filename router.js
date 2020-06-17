const express = require("express");
const router = express.Router(),
userRoutes = require('./users/userRoutes'),
authRoutes = require('./auth/register')
handRoutes = require('./Hands/handRouter')

router.get("/", (req, res) => {
  //console.log('ho')
  res.send({ response: "Server is up and running." }).status(200);
});

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/hands', handRoutes)

module.exports = router;