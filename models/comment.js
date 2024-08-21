module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );

  //   Comment.associate = (models) => {
  //     Comment.belongsTo(models.Post, {foreignKey: "postId", as: "post"});
  //   };

  return Comment;
};
