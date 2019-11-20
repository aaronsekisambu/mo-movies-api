// 'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('movies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    movieName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    movieGenre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    language: {
      type: Sequelize.STRING,
      allowNull: false
    },
    moviesLink: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    movieAvatar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now")
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now")
    }
  });
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('movies');
}