const db = require("../models");
const {pagination} = require("../util/");

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
    const autobot = await db.Autobot.findByPk(req.params.id, {
      include: [{model: db.Post, as: "Posts", limit: 10}],
    });

    if (!autobot) return res.status(404).json({error: "Autobot not found"});
    res.json(autobot.Posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Failed to fetch posts for this Autobot"});
  }
};
