const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});
module.exports = loginRouter;
