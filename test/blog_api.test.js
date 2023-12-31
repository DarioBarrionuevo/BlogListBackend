/* eslint-disable quotes */
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
describe("api", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("checking id attribute", async () => {
    const response = await api.get("/api/blogs");
    const result = response.body.map((r) => r.id);

    expect(result[0]).toBeDefined();
  });
  // test("a valid blog can be added", async () => {
  //   const newBlog = {
  //     title: "Las que entran por las que salen",
  //     author: "Marianico el short",
  //     url: "http://www.nochedefiesta.es",
  //     likes: 5,
  //   };

  //   await api
  //     .post("/api/blogs")
  //     .send(newBlog)
  //     .expect(201)
  //     .expect("Content-Type", /application\/json/);

  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  //   const response = await api.get("/api/blogs");
  //   const result = response.body.map((r) => r.title);
  //   // console.log("🚀 ~ file: blog_api.test.js:53 ~ test.only ~ result:", result)
  //   expect(result).toContain("Las que entran por las que salen");
  // });
  // test("blog without likes default to 0 likes", async () => {
  //   const noLikesBlog = {
  //     title: "Como estan ustedes",
  //     author: "Fofito aragon",
  //     url: "http://www.faltanlikes.es",
  //   };

  //   const response = await api.post("/api/blogs").send(noLikesBlog);
  //   expect(response.body.likes).toBe(0);
  // });

  // test("no title and url return 400 status", async () => {
  //   const noUrlAndTitleBlog = {
  //     author: "Carmen de mairena",
  //     likes: 0,
  //   };

  //   await api.post("/api/blogs").send(noUrlAndTitleBlog).expect(400);
  // });
});
describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});
describe("update of likes", () => {
  test("succeeds if updates likes from a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const idBlog = blogsAtStart[0].id;
    const newBlog = {
      likes: 999,
    };

    await api.put(`/api/blogs/${idBlog}`).send(newBlog).expect(200);

    const updatedBlog = await api.get(`/api/blogs/${idBlog}`);
    expect(updatedBlog.body.likes).toBe(999);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
