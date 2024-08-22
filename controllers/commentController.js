const db = require("../models");
const {pagination} = require("../util");

exports.getComment = async (req, res) => {
  try {
    const {offset, limit, page} = pagination(req);

    const comments = await db.Comment.findAll({
      where: {postId: id},
      limit,
      offset,
    });
    const totalComments = await db.Post.count();

    if (!comments)
      return res.status(404).json({error: "Post comments not found"});
    res.json({
      comments,
      currentPage: page,
      perPage: posts.length,
      totalComments,
    });
  } catch (error) {
    res.status(500).json({error: "Failed to fetch the post comments"});
  }
};
