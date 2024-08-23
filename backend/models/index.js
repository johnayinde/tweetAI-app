const {Sequelize} = require("sequelize");
const dbConfig = require("../config/config").development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Autobot = require("./autbot")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

// Associations
db.Autobot.hasMany(db.Post, {foreignKey: "autobotId"});
db.Post.belongsTo(db.Autobot, {foreignKey: "autobotId"});
db.Post.hasMany(db.Comment, {foreignKey: "postId"});
db.Comment.belongsTo(db.Post, {foreignKey: "postId"});

module.exports = db;
