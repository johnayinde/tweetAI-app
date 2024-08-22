const db = require("../models");

exports.createAutobot = async (autobotData) => {
  return await db.Autobot.create(autobotData);
};

exports.getAutobotById = async (id) => {
  return await db.Autobot.findByPk(id, {
    include: [{model: db.Post, as: "posts"}],
  });
};

exports.getAllAutobots = async () => {
  return await db.Autobot.findAll({limit: 10});
};
