const {Sequelize} = require("sequelize");
const dbConfig = require("../config/config.json").development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Autobot = require("./autbot")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

// Associations
db.Autobot.hasMany(db.Post, {as: "posts"});
db.Post.belongsTo(db.Autobot, {foreignKey: "autobotId", as: "autobot"});
db.Post.hasMany(db.Comment, {as: "comments"});
db.Comment.belongsTo(db.Post, {foreignKey: "postId", as: "post"});

module.exports = db;
