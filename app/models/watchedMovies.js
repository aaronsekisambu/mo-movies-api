// "use strict";
export default (sequelize, DataTypes) => {
  const watchedMovies = sequelize.define(
    "watchedMovies",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  watchedMovies.associate = function(models) {
    // associations can be defined here
    watchedMovies.belongsTo(models.users, {
      foreignKey: "userId"
    });
    watchedMovies.belongsTo(models.movies, { foreignKey: "movieId" });
  };
  return watchedMovies;
};
