const db = require("../models");

exports.createComment = async (commentData) => {
  return await db.Comment.create(commentData);
};

exports.getCommentsByPost = async (postId) => {
  return await db.Comment.findAll({where: {postId}, limit: 10});
};
