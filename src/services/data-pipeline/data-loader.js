import { Nhl } from '../../sequelize/model.js';
class DataLoader {

  async load(transformedData) {
    try {
      const result = await Nhl.bulkCreate(transformedData, {
        updateOnDuplicate: ["assists", "goals", "hits", "points", "penaltyMinutes"],
      });
      return result;
    } catch (error) {
      console.error('Error loading data into the database:', error);
      return null;
    }
  }

  async fetchGameData(gameId) {
    try {
      const gameData = await Nhl.findAll({ where: { gameId: gameId } });
      return gameData;
    } catch (error) {
      console.error('Error fetching game data from the database:', error);
      return null;
    }
  }
}

export { DataLoader };