import { fetchNHLData } from '../nhl/index';
class DataExtractor {
  async extract(gameId) {
    const gameEndpoint = `/game/${gameId}/feed/live`;
    const gameData = await fetchNHLData(gameEndpoint);
    return gameData;
  }
}

export { DataExtractor };
