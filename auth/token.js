const jwt = require("jsonwebtoken");

const secrets = require("../secret");

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "3hours"
  };

  return jwt.sign(payload, secret, options);
}