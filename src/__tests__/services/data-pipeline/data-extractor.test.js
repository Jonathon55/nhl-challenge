import { DataExtractor } from '../../../services/data-pipeline/data-extractor';
import { fetchNHLData } from '../../../services/nhl/index';

jest.mock('../../../services/nhl/index');

describe('DataExtractor', () => {
  let dataExtractor;

  beforeEach(() => {
    dataExtractor = new DataExtractor();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should fetch game data from the NHL API', async () => {
    const gameId = 12345;

    const mockGameData = {
      gameData: {
        game: {
          id: gameId,
        },
      },
    };

    fetchNHLData.mockResolvedValue(mockGameData);

    const extractedData = await dataExtractor.extract(gameId);

    expect(extractedData).toEqual(mockGameData);
    expect(fetchNHLData).toHaveBeenCalledWith(`/game/${gameId}/feed/live`);
  });
});