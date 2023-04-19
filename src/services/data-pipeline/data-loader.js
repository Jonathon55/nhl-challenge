import { Nhl } from '../../sequelize/model.js';
import { fetchNHLData } from '../nhl/index.js';
import {DataTransformer } from './data-transformer.js'
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

  async ingestSeasonData(season) {
    try {
      const seasonSchedule = await fetchNHLData(`schedule?season=${season}&expand=schedule.linescore`);
      if (!seasonSchedule || !seasonSchedule.dates || seasonSchedule.dates.length === 0) {
        console.error('Error fetching season schedule');
        return;
      }

      const dataTransformer = new DataTransformer();

      for (const date of seasonSchedule.dates) {
        for (const game of date.games) {
          const gameId = game.gamePk;
          const gameStats = await fetchNHLData(`game/${gameId}/boxscore`);
          
          // Transform the data using DataTransformer
          const transformedData = dataTransformer.transform({
            gameId,
            gameData: gameStats
          });
          await this.load(transformedData);
        }
      }
    } catch (error) {
      console.error('Error ingesting season data:', error);
    }
  }

}

export { DataLoader };