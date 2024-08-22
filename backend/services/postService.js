const db = require("../models");

exports.createPost = async (postData) => {
  return await db.Post.create(postData);
};

exports.getPostsByAutobot = async (autobotId) => {
  return await db.Post.findAll({where: {autobotId}, limit: 10});
};
