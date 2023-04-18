import { DataPipeline } from '../../../services/data-pipeline/index';
import { DataExtractor } from "../../../services/data-pipeline/data-extractor";
import { DataTransformer } from '../../../services/data-pipeline/data-transformer';
import { DataLoader } from '../../../services/data-pipeline/data-loader';

jest.mock('../../../services/data-pipeline/data-extractor');
jest.mock('../../../services/data-pipeline/data-transformer');
jest.mock('../../../services/data-pipeline/data-loader');

describe('DataPipeline', () => {
  let dataPipeline;

  beforeEach(() => {
    dataPipeline = new DataPipeline();
  });

  test('should process game data using extraction, transformation, and loading', async () => {
    const gameId = 12345;
    const rawData = { rawData: 'rawData' };
    const transformedData = { transformedData: 'transformedData' };

    DataExtractor.prototype.extract.mockResolvedValue(rawData);
    DataTransformer.prototype.transform.mockReturnValue(transformedData);
    DataLoader.prototype.load.mockResolvedValue();

    await dataPipeline.processData(gameId);

    expect(DataExtractor.prototype.extract).toHaveBeenCalledWith(gameId);
    expect(DataTransformer.prototype.transform).toHaveBeenCalledWith(rawData);
    expect(DataLoader.prototype.load).toHaveBeenCalledWith(transformedData);
  });
});