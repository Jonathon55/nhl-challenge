import { DataPipeline } from './index.js';
class DataIngestionService {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.dataPipeline = new DataPipeline();
  }

  async processGameData(gameId) {
    // Process the game data using the DataPipeline class
    await this.dataPipeline.processData(gameId);
  }
}

export { DataIngestionService };