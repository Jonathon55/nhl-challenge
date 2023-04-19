import { DataLoader } from '../data-pipeline/data-loader';

async function queryGame(gameId) {
  const dataLoader = new DataLoader();

  const gameData = await dataLoader.fetchGameData(gameId);

  if (gameData && gameData.length > 0) {
    console.log(`Game ID: ${gameId}`);
    console.log('-----------------------------------');
    gameData.forEach(player => {
      console.log(`Player: ${player.playerName} (${player.playerPosition})`);
      console.log(`Team: ${player.teamName}`);
      console.log(`Goals: ${player.goals}`);
      console.log(`Assists: ${player.assists}`);
      console.log(`Points: ${player.points}`);
      console.log(`Hits: ${player.hits}`);
      console.log(`Penalty Minutes: ${player.penaltyMinutes}`);
      console.log(`Opponent: ${player.opponnetTeam}`);
      console.log('-----------------------------------');
    });
  } else {
    console.log('No data found for the specified game.');
  }
}

export default queryGame;
