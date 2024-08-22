const db = require("../models");
const {pagination} = require("../util");

exports.getPostComments = async (req, res) => {
  try {
    const {offset, limit, page} = pagination(req);

    const comments = await db.Comment.findByPk({
      where: {postId: req.params.id},
      offset,
      limit,
    });
    const totalComments = await db.Comment.count();

    if (!post) return res.status(404).json({error: "Post not found"});
    res.json({
      comments,
      currentPage: page,
      perPage: posts.length,
      totalComments,
    });
  } catch (error) {
    res.status(500).json({error: "Failed to fetch comments for this post"});
  }
};
