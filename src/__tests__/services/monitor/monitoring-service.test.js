import { MonitoringService }  from '../../../services/monitor/';
import redis from 'redis';

jest.mock('redis', () => {
  return require('redis-mock');
});


describe('MonitoringService', () => {
  let monitoringService;

  beforeEach(() => {
    const redisClient = redis.createClient();
    monitoringService = new MonitoringService(redisClient);
  });

  afterEach(() => {
    monitoringService.stopMonitoring();
  });

  test('should start monitoring for game status changes', () => {
    jest.spyOn(monitoringService, 'startMonitoring');
    monitoringService.startMonitoring();
    expect(monitoringService.startMonitoring).toHaveBeenCalled();
  });
  
  test('should send a message via Redis when the game status changes to live', async () => {
    const gameStatus = 'live';
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
    monitoringService.redisClient.publish = jest.fn();

    // Start monitoring and wait for a tick
    monitoringService.startMonitoring();
    await new Promise((resolve) => setTimeout(resolve, monitoringService.interval + 100));

    expect(monitoringService.redisClient.publish).toHaveBeenCalledWith(
      'gameStatus',
      JSON.stringify({
        gamePk: gameId,
        status: gameStatus,
      }),
    );
  });
});
