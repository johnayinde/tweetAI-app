const db = require("../models");

exports.getComment = async (req, res) => {
  try {
    const comment = await db.Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({error: "Comment not found"});
    res.json(comment);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch the comment"});
  }
};
