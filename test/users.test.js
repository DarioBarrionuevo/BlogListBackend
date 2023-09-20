const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper.js");
const app = require("../app.js");
const api = supertest(app);
const User = require("../models/user.js");

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUser.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});
test("fails with status code 400 if data invalid", async () => {
  const newUser = {
    username: "",
  };

  await api.post("/api/users").send(newUser).expect(400);

  const usersAtEnd = await helper.usersInDb();

  expect(usersAtEnd).toHaveLength(helper.initialUser.length);
});
afterAll(() => {
  mongoose.connection.close();
});
