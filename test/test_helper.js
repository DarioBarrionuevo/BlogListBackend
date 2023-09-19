const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: " Vamos que nos vamos",
    author: "pepe",
    url: "wwww.eeeee.com",
    likes: 2,
    _id: "650581d10fb387631904dd45",
  },
  {
    title: "Una vieja y un viejo van",
    author: "luis",
    url: "wwww.aaaaa.es",
    likes: 4,
    _id: "6505822d0fb387631904dd48",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "test",
    author: "test",
    url: "wwww.test.com",
    likes: 1,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
