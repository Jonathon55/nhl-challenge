class DataTransformer {
  parsePlayerObject(playerObject = {}, gameId, opponentTeam) {
    return Object.entries(playerObject).map(([key, value]) => {
      const { person, stats: rawStats } = value || {};
      const { currentTeam, primaryPosition, ...personData } = person || {};

      const stats =
        primaryPosition?.name == 'Goalie'
          ? rawStats?.goalieStats
          : rawStats?.skaterStats;

      const assists = stats?.assists || 0;
      const goals = stats?.goals || 0;
      const points = assists + goals;

      return {
        id: `${gameId}${personData.id}`,
        gameId,
        playerId: personData.id,
        playerName: personData.fullName,
        teamId: currentTeam?.id,
        teamName: currentTeam?.name,
        playerAge: personData.currentAge,
        playerNumber: personData.primaryNumber,
        playerPosition: primaryPosition?.name,
        assists,
        goals,
        hits: stats?.hits || 0,
        points,
        penaltyMinutes: stats?.penaltyMinutes,
        opponnetTeam: opponentTeam,
      };
    });
  }

  transform(data) {
    const {
      gameId,
      gameData: {
        teams: {
          home: { team: homeTeamData, players: homePlayersObject },
          away: { team: awayTeamData, players: awayPlayersObject },
        },
      },
    } = data;

    const homeTeam = homeTeamData.name;
    const awayTeam = awayTeamData.name;

    const transformedData = [
      ...this.parsePlayerObject(homePlayersObject, gameId, awayTeam),
      ...this.parsePlayerObject(awayPlayersObject, gameId, homeTeam),
    ];

  
    console.log(JSON.stringify(transformedData), `Transformed Results`);

    return transformedData;
  }
}

export { DataTransformer };
