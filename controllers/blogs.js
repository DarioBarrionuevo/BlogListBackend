const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// GET ALL
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});
// ADD ONE
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.author || !blog.url) {
    response.status(400).end();
  } else {
    const result = await blog.save();
    response.status(201).json(result);
  }
});
// DELETE ONE
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
