const autbotService = require("./services/autbotService");
const postService = require("./services/postService");
const commentService = require("./services/commentService");
const axios = require("axios");

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

// Scheduler function to be run on the server
async function generateAutobots() {
  console.log("Running a task every 5 minutes");

  try {
    // Fetch data from jsonplaceholder.typicode.com
    const {data: users} = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const {data: posts} = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const {data: comments} = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    // Limit to 500 Autobots
    for (let i = 0; i < 500; i++) {
      let user = users[i % users.length];
      const username = `${user.username}_${generateRandomString(10)}`;
      const email = `${user.name}_${generateRandomString(
        5
      )}@tweetai.com`.toLowerCase();

      const autobot = await autbotService.createAutobot({
        name: user.name,
        username,
        email,
        phone: user.phone,
      });

      for (let j = 0; j < 10; j++) {
        const postIndex = (i * 5 + j) % posts.length;
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

          await commentService.createComment({
            name: comment.name,
            email,
            body: comment.body,
            postId: createdPost.id,
          });
        }
      }
    }

    console.log("Autobots, Posts, and Comments created successfully");
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
}

module.exports = {generateAutobots};
