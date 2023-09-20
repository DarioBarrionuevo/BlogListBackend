/* eslint-disable quotes */
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// GET ALL USERS
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

// ADD ONE USER
usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.username.length <= 3) {
    return response
      .status(400)
      .send({ error: "username must be longer than 2 characters" });
  }
  if (body.password.length <= 3) {
    return response
      .status(400)
      .send({ error: "password must be longer than 2 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
