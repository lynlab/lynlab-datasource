module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    body: DataTypes.TEXT,
    postCategoryId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        Post.belongsTo(models.PostCategory);
      },
    },
  });
  return Post;
};
