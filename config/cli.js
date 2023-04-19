import { MonitoringService } from '../src/services/monitor/monitoring-service.js';
import queryGame from '../src/services/query/game.js';

const command = process.argv[2];

//handles our cli arguments
// TODO: Clean up
const cliTool = async () => {
  switch (command) {
    case 'monitor-nhl':
    const monitorNHL = new MonitoringService();
    await monitorNHL.initializeRedisClient();
    monitorNHL.startMonitoring();
      break;
    case 'monitor-nhl:live':
      const monitorNHLLive = new MonitoringService(null, '* * * * *', false);
      await monitorNHLLive.initializeRedisClient();
      monitorNHLLive.checkLiveGames();
      break;
    case 'monitor-nhl:game':
      const gameId = process.argv[3].split(':')[0];
      queryGame(gameId);
      break;
    default:
      console.error('Unknown command:', command);
      process.exit(1);
  }
}
cliTool();
  