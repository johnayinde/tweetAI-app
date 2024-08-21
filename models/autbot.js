module.exports = (sequelize, DataTypes) => {
  const Autobot = sequelize.define(
    "Autobot",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // Autobot.associate = (models) => {
  //   Autobot.hasMany(models.Post, {as: "posts", foreignKey: "autobotId"});
  // };

  return Autobot;
};
