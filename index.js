const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
const mockBlogs = [
  {
    title: " Vamos que nos vamos",
    author: "pepe",
    url: "wwww.eeeee.com",
    likes: 2,
  },
  {
    title: "Una vieja y un viejo van",
    author: "luis",
    url: "wwww.aaaaa.es",
    likes: 4,
  },
];
const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

app.get("/api/blogs", (request, response) => {
  //   Blog.find({}).then((blogs) => {
  //     response.json(blogs);
  //   });
  response.json(mockBlogs);
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
