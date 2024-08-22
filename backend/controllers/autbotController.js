const db = require("../models");
const {pagination} = require("../util");

exports.getAutobots = async (req, res) => {
  try {
    const {offset, limit, page} = pagination(req);

    const totalAutobots = await db.Autobot.count();
    const autobots = await db.Autobot.findAll({offset, limit});

    res.json({
      autobots,
      currentPage: page,
      perPage: autobots.length,
      totalAutobots,
    });
  } catch (error) {
    res.status(500).json({error: "Failed to fetch Autobots"});
  }
};

exports.getAutobotPosts = async (req, res) => {
  try {
    const {offset, limit, page} = pagination(req);

    const posts = await db.Post.findAll({
      where: {autobotId: req.params.id},
      offset,
      limit,
    });

    const totalPosts = await db.Post.findAll({
      where: {autobotId: req.params.id},
    });

    if (!posts) return res.status(404).json({error: "Autobot not found"});
    res.json({
      posts,
      currentPage: page,
      perPage: posts.length,
      totalPosts: totalPosts.length,
    });
  } catch (error) {
    res.status(500).json({error: "Failed to fetch posts for this Autobot"});
  }
};
