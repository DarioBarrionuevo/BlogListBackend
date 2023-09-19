const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// GET ALL
blogsRouter.get("/", (request, response, next) => {
  // console.log("eeeeeeeeeeee")
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});
// ADD ONE
blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.author || !blog.url) {
    response.status(400).end();
  } else {
    blog
      .save()
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        next(error);
      });
  }
});

module.exports = blogsRouter;
