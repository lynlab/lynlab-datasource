module.exports = (sequelize, DataTypes) => {
  const PostSeries = sequelize.define('PostSeries', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {

      },
    },
  });
  return PostSeries;
};
