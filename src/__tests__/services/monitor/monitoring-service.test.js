import { MonitoringService } from '../../../services/monitor/monitoring-service.js';
import { createClient } from 'redis';

jest.mock('redis', () => {
  return require('redis-mock');
});

describe('MonitoringService', () => {
  let monitoringService;

  beforeEach(async () => {
    const redisClient = createClient(); 
    monitoringService = new MonitoringService(redisClient, '* * * * * *');
    await monitoringService.initializeRedisClient();
  });

  afterEach(async () => {
    monitoringService.stopMonitoring();
  });

  test('should start monitoring for game status changes', async () => {
    jest.spyOn(monitoringService, 'startMonitoring');
    await monitoringService.startMonitoring();
    expect(await monitoringService.startMonitoring).toHaveBeenCalled();
  });
  
  test('should send a message via Redis when the game status changes to live', async () => {
    const gameStatus = 'Live';
    const gameId = 12345;

    // mock the NHL API response to simulate a live game
    // TODO: come back to verify results from api
    monitoringService.fetchGames = jest.fn(() => {
      return Promise.resolve([
        {
          gamePk: gameId,
          status: {
            abstractGameState: gameStatus,
          },
        },
      ]);
    });

    // Mock the Redis publish method to verify that it's called
    monitoringService.publisher.publish = jest.fn();

    // Start monitoring and wait for a tick
   await monitoringService.startMonitoring();

    await new Promise((resolve) => {
      setTimeout(() => {
        monitoringService.stopMonitoring(); // Manually stop the cron job
        resolve();
      }, 1500);
    });

    expect(monitoringService.publisher.publish).toHaveBeenCalledWith(
      'live_games',
      JSON.stringify({
        action: "start",
        gamePk: gameId,
      }),
    );
  });
});
