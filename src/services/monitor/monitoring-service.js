import cron from 'node-cron';
import redis from 'redis';
import { fetchNHLData } from '../nhl/index'

export class MonitoringService {
  constructor(redisClient = null, cronSchedule = '* * * * *', autoMonitor = true) {
    this.schedule = null;
    this.publisher = redisClient || redis.createClient();
    this.cronSchedule = cronSchedule;
    this.autoMonitor = autoMonitor;
  }

  startMonitoring() {
    if (!this.schedule) {
      this.schedule = cron.schedule(this.cronSchedule, () => {

        console.log('Checking for live games...');

        this.checkLiveGames();
      });
    } 
    else {
      console.log('Monitoring service is already running.');
    }
  }

  stopMonitoring() {
    if (this.schedule) {
      this.schedule.stop();
      this.schedule = null;
    } 
    else {
      console.log('Monitoring service is not running.');
    }
  }
  
  async fetchGames() {
    try {
      const response = await fetchNHLData(`schedule?expand=schedule.linescore`);
      return response.data.dates.length > 0 ? response.data.dates[0].games : [];
    } catch (error) {  
      console.error('Error fetching schedule:', error.message);      
    }    
  }

  async checkLiveGames() {
    try {
      const games = await this.fetchGames();

      let liveGamesFound = false;

      if(!games.length) {
        console.log("No Games Today");
      }
      games.forEach(game => {
        const gameState = game.status.abstractGameState;
       
        if (gameState === 'Live') {   
          console.log(`Game ${game.gamePk} is live!`);
          liveGamesFound = true;

          //Trigger Feature two
          this.publisher.publish('live_games', JSON.stringify({ action: 'start', gamePk: game.gamePk }));
        } 
        else if (gameState === 'Final') {
          console.log(`Game ${game.gamePk} is over.`);
          this.publisher.publish('live_games', JSON.stringify({ action: 'stop', gamePk: game.gamePk }));
          }
        });

        if (!this.autoMonitor && !liveGamesFound) {
            console.log("No live games found, stopping the process.");
            process.exit(0);
        }

    } catch (error) {
      console.error('Error fetching schedule:', error.message);
      process.exit("Error, Service Terminated");
    }
  }
}
