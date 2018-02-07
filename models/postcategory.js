
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        PostCategory.hasMany(models.Post);
      },
    },
  });
  return PostCategory;
};
