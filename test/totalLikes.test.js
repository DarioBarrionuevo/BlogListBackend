const listHelper = require("../utils/list_helper");

const blogList = [
  {
    title: " Vamos que nos vamos",
    author: "pepe",
    url: "wwww.eeeee.com",
    likes: 2,
    id: "650581d10fb387631904dd45",
  },
  {
    title: "Una vieja y un viejo van",
    author: "luis",
    url: "wwww.aaaaa.es",
    likes: 4,
    id: "6505822d0fb387631904dd48",
  },
];

describe("total likes", () => {
  test("when list is empty", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test(`when list has only one blog, equals the likes of that)`, () => {
    const blogs = [
      {
        title: " Vamos que nos vamos",
        author: "pepe",
        url: "wwww.eeeee.com",
        likes: 2,
        id: "650581d10fb387631904dd45",
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(blogs[0].likes);
  });
  test("when list has more than one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogList);
    expect(result).toBe(6);
  });
  test("when list has a favorite depending on likes number", () => {
    const result = listHelper.favorite(blogList);
    expect(result).toEqual(blogList[1]);
  });
});
