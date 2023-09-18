const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    const reducer = (sum, blog) => {
      return sum + blog.likes;
    };

    return blogs.reduce(reducer, 0);
  }
};

const favorite = (blogs) => {
  const likes = blogs.map((item) => item.likes);
  //   console.log("🚀 ~ file: list_helper.js:20 ~ favorite ~ likes:", likes);
  const blog = blogs[likes.indexOf(Math.max(...likes))];
  //   console.log("🚀 ~ file: list_helper.js:22 ~ favorite ~ blog:", blog)

  return blog;
};
module.exports = {
  dummy,
  totalLikes,
  favorite,
};
