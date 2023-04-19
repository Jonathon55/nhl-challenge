import Sequelize from 'sequelize';
import sequelize from './index.js';

const Nhl = sequelize.define('Nhl', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  gameId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  playerName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  teamId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  teamName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  playerAge: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  playerNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  playerPosition: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  assists: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  goals: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  hits: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  penaltyMinutes: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  opponnetTeam: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: {
    allowNull: true,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: true,
    type: Sequelize.DATE
  }
});

export { Nhl };
