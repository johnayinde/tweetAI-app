const autbotService = require("./services/autbotService");
const postService = require("./services/postService");
const commentService = require("./services/commentService");
const axios = require("axios");
const {infoLog} = require("./util");

// Function to generate a random string of given length
function generateRandomString(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

// Helper function to create Autobots
async function createAutobots(users) {
  infoLog("(2/4) Creating Autobots");

  const autobots = [];
  for (let index = 0; index < 500; index++) {
    let user = users[index % users.length];
    const username = `${user.username}_${generateRandomString(10)}`;
    const email = `${user.name}_${generateRandomString(
      5
    )}@tweetai.com`.toLowerCase();
    autobots.push({
      name: user.name,
      username,
      email,
      phone: user.phone,
    });
  }
  return Promise.all(
    autobots.map((autobot) => autbotService.createAutobot(autobot))
  );
}

// Helper function to create Posts and Comments
async function createAutobotPostsAndComments(posts, comments, autobots) {
  infoLog("(3/4) Creating Post and comments");

  const postsToCreate = [];
  const commentsToCreate = [];

  for (const autobot of autobots) {
    for (let i = 0; i < 10; i++) {
      const postIndex = (autobots.indexOf(autobot) * 10 + i) % posts.length;
      const post = posts[postIndex];
      const title = `${post.title} - Unique ${generateRandomString(10)}`;

      const createdPost = await postService.createPost({
        title,
        body: post.body,
        autobotId: autobot.id,
      });

      for (let k = 0; k < 10; k++) {
        const commentIndex = (postIndex * 10 + k) % comments.length;
        const comment = comments[commentIndex];
        const email = `${comment.name}_${generateRandomString(
          5
        )}@tweetai.com`.toLowerCase();

        commentsToCreate.push({
          name: comment.name,
          email,
          body: comment.body,
          postId: createdPost.id,
        });
      }
    }
  }

  await Promise.all(postsToCreate.map((post) => postService.createPost(post)));
  await Promise.all(
    commentsToCreate.map((comment) => commentService.createComment(comment))
  );
}

// Scheduler function to be run on the server
async function generateAutobots() {
  infoLog("Running a task every 1 hour");

  try {
    // Fetch data from jsonplaceholder.typicode.com
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const users = usersResponse.data;
    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    infoLog("(1/4) Fetched data successfully");

    // Create Autobots
    const autobots = await createAutobots(users);

    // Create Posts and Comments
    await createAutobotPostsAndComments(posts, comments, autobots);

    infoLog("(4/4) Autobots, Posts, and Comments created successfully 🤖");
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
}

module.exports = {generateAutobots};
