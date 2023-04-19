import { DataExtractor } from './data-extractor.js';
import { DataTransformer } from './data-transformer.js';
import { DataLoader } from './data-loader.js';

class DataPipeline {
  constructor() {
    this.dataExtractor = new DataExtractor();
    this.dataTransformer = new DataTransformer();
    this.dataLoader = new DataLoader();
  }

  async processData(gameId) {
    // Extract data from the NHL API
    const rawData = await this.dataExtractor.extract(gameId);

    // Transform the raw data into a structured format
    const transformedData = this.dataTransformer.transform(rawData);

    // Load the transformed data into the database
    await this.dataLoader.load(transformedData);
  }
}

export { DataPipeline };