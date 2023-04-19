import cron from 'node-cron';
import { fetchNHLData } from '../nhl/index.js'
import { createClient } from "@redis/client";
import config from '../../../config/index.js'

export class MonitoringService {
 constructor(redisClient = null, cronSchedule = '* * * * *', autoMonitor = true) {
    this.schedule = null;
    this.publisher = redisClient;
    this.cronSchedule = cronSchedule;
    this.autoMonitor = autoMonitor;
  }

  async startMonitoring() {
    if (!this.schedule) {
      //check for livegames first then go about regular business
      this.checkLiveGames().then(() => {
        console.log("Starting cron job...");
        this.schedule = cron.schedule(this.cronSchedule, async () => {
          console.log("Checking for live games...");
          await this.checkLiveGames();
        });
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

  async initializeRedisClient() {
    if (!this.publisher) {
      this.publisher = createClient({ host: config.REDIS_HOST, port: config.REDIS_PORT });

      this.publisher.on("error", (err) => {
        console.error("Redis client encountered an error:", err);
      });

      try {
        await this.publisher.connect();
        console.log("Redis client is ready.");
      } catch (err) {
        console.error("Error connecting to Redis:", err);
      }
    }
  }
  
  async fetchGames() {
    try {
      const response = await fetchNHLData(`schedule?expand=schedule.linescore`);
      if (response && response.dates) {
        return response.dates.length > 0 ? response.dates[0].games : [];
      } else {
        console.error("Unexpected response structure");
        return [];
      }
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
