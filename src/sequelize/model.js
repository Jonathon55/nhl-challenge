import Sequelize from 'sequelize';
import sequelize from './index.js';

const Nhl = sequelize.define('Nhl', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  gameId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  playerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  teamId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  teamName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  playerAge: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  playerNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  playerPosition: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  assists: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  goals: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hits: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  penaltyMinutes: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  opponnetTeam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

export { Nhl };
