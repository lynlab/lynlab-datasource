module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    body: DataTypes.TEXT,
    preview: DataTypes.TEXT,
    postCategoryId: DataTypes.INTEGER,
    postSeriesId: DataTypes.INTEGER,
    hitCount: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        Post.belongsTo(models.PostCategory);
        Post.belongsTo(models.PostSeries);
      },
    },
  });
  return Post;
};
