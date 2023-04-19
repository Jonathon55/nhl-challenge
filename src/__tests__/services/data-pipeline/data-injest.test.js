
import { DataIngestionService } from '../../../services/data-pipeline/data-injestor';
import { DataPipeline } from '../../../services/data-pipeline/index';
import { createClient } from 'redis-mock';

jest.mock('../../../services/data-pipeline/index');

describe('DataIngestionService', () => {
  let dataIngestionService;
  let redisClient;

  beforeEach(() => {
    redisClient = createClient();
    dataIngestionService = new DataIngestionService(redisClient);
  });

  test('should process game data using the DataPipeline class', async () => {
    const gameId = 12345;

    DataPipeline.prototype.processData.mockResolvedValue();

    await dataIngestionService.processGameData(gameId);

    expect(DataPipeline.prototype.processData).toHaveBeenCalledWith(gameId);
  });
});