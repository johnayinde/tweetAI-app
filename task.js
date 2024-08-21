const cron = require("node-cron");
const autbotService = require("../services/autbotService");
const postService = require("../services/postService");
const commentService = require("../services/commentService");

// Schedule tasks to be run on the server
cron.schedule("*/5 * * * *", async () => {
  console.log("Running a task every 5 minutes");

  try {
    // Fetch data from jsonplaceholder.typicode.com
    const axios = require("axios");
    const {data: users} = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const {data: posts} = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const {data: comments} = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    // Iterate through users and create Autobots
    for (const user of users) {
      const autobot = await autbotService.createAutobot({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
      });

      // Find related posts for this Autobot
      const userPosts = posts.filter((post) => post.userId === user.id);

      // Create Posts
      for (const post of userPosts) {
        const createdPost = await postService.createPost({
          title: post.title,
          body: post.body,
          autobotId: autobot.id,
        });

        // Find related comments for this Post
        const postComments = comments.filter(
          (comment) => comment.postId === post.id
        );

        // Create Comments
        for (const comment of postComments) {
          await commentService.createComment({
            name: comment.name,
            email: comment.email,
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
});
