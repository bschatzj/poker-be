const express = require("express");
const router = express.Router(),
userRoutes = require('./users/userRoutes'),
authRoutes = require('./auth/register.js')

router.get("/", (req, res) => {
  console.log('ho')
  res.send({ response: "Server is up and running." }).status(200);
});

router.use('/users', userRoutes)
router.use('/auth', authRoutes)

module.exports = router;