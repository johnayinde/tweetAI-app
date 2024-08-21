const db = require("../models");

exports.getAutobots = async (req, res) => {
  try {
    const autobots = await db.Autobot.findAll({limit: 10});
    res.json(autobots);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch Autobots"});
  }
};

exports.getAutobotPosts = async (req, res) => {
  try {
    const autobot = await db.Autobot.findByPk(req.params.id, {
      include: [{model: db.Post, as: "posts", limit: 10}],
    });
    if (!autobot) return res.status(404).json({error: "Autobot not found"});
    res.json(autobot.posts);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch posts for this Autobot"});
  }
};
