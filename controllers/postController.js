const db = require("../models");

exports.getPostComments = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id, {
      include: [{model: db.Comment, as: "comments", limit: 10}],
    });
    if (!post) return res.status(404).json({error: "Post not found"});
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch comments for this post"});
  }
};
