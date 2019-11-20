// "use strict";
export default (sequelize, DataTypes) => {
  const movies = sequelize.define(
    "movies",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      movieName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      movieGenre: {
        type: DataTypes.STRING,
        allowNull: true
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      moviesLink: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      movieAvatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  movies.associate = function(models) {
    // associations can be defined here
    movies.belongsTo(models.users, { foreignKey: "userId" });
  };
  return movies;
};
