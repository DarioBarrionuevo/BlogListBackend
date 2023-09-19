const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// GET ALL
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);

  // Blog.find({})
  //   .then((blogs) => {
  //     response.json(blogs);
  //   })
  // .catch((error) => next(error));
});
// ADD ONE
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.author || !blog.url) {
    response.status(400).end();
  } else {
    const result = await blog.save();
    response.status(201).json(result);
    // blog
    //   .save()
    //   .then((result) => {
    //     response.status(201).json(result);
    //   })
    // .catch((error) => {
    //   next(error);
    // });
  }
});

module.exports = blogsRouter;
