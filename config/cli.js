import { MonitoringService } from '../src/services/monitor/monitoring-service.js';
import { DataLoader } from '../src/services/data-pipeline/data-loader.js';
import queryGame from '../src/services/query/game.js';

const command = process.argv[2];

//handles our cli arguments
// TODO: Clean up
const cliTool = async () => {
  switch (command) {
    case 'monitor-nhl':
    const monitorNHL = new MonitoringService();
    await monitorNHL.initializeRedisClient();
    await monitorNHL.startMonitoring();
      break;
    case 'monitor-nhl:live':
      const monitorNHLLive = new MonitoringService(null, '* * * * *', false);
      await monitorNHLLive.initializeRedisClient();
      await monitorNHLLive.checkLiveGames();
      break;
    case 'monitor-nhl:game':
      const gameId = process.argv[3].split(':')[0];
      queryGame(gameId);
      break;
    case 'ingest-season-data':
      const season = process.argv[3];
      if (!season) {
        console.error('Please provide a season');
        process.exit(1);
      }
      const dataLoader = new DataLoader();
      await dataLoader.ingestSeasonData(season);
      break;
    default:
      console.error('Unknown command:', command);
      process.exit(1);
  }
}
cliTool();
  