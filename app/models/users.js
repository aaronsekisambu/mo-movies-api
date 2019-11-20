// "use strict";
export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      roles: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.movies, { foreignKey: "userId" });
    users.hasMany(models.watchedMovies, { foreignKey: "userId" });
  };
  return users;
};
