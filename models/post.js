module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      autobotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Autobots",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );

  return Post;
};
