const db = require("../models");
const {pagination} = require("../util");

exports.getPostComments = async (req, res) => {
  try {
    const {offset, limit, page} = pagination(req);

    const comments = await db.Comment.findAll({
      where: {postId: req.params.id},
      offset,
      limit,
    });
    const totalComments = await db.Comment.findAll({
      where: {postId: req.params.id},
    });

    if (!comments) return res.status(404).json({error: "Post not found"});
    res.json({
      comments,
      currentPage: page,
      perPage: comments.length,
      totalComments: totalComments.length,
    });
  } catch (error) {
    res.status(500).json({error: "Failed to fetch comments for this post"});
  }
};
