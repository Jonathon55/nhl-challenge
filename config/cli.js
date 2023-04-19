import { MonitoringService } from '../src/services/monitor/monitoring-service.js';
import queryGame from '../src/services/query/game.js';

const command = process.argv[2];

//handles our cli arguments
// TODO: Clean up
switch (command) {
  case 'monitor-nhl':
  const monitorNHL = new MonitoringService();
  monitorNHL.startMonitoring();
    break;
  case 'monitor-nhl:live':
    const monitorNHLLive = new MonitoringService(null, '* * * * *', false);
    monitorNHLLive.checkLiveGames();
    break;
  case 'query-game':
    const gameId = process.argv[3].split(':')[1];
    queryGame(gameId);
    break;
  default:
    console.error('Unknown command:', command);
    process.exit(1);
}
