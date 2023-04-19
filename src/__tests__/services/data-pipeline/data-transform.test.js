import { DataTransformer } from "../../../services/data-pipeline/data-transformer.js";

describe("DataTransformer", () => {
  const dataTransformer = new DataTransformer();
  const mockData = {
    gameId: "2022020001",
    gameData: {
      teams: {
        home: {
          team: {
            name: "Home Team",
          },
          players: {
            "ID1": {
              person: {
                id: 1,
                fullName: "Player One",
                currentAge: 25,
                primaryNumber: "10",
                primaryPosition: {
                  name: "Center",
                },
                currentTeam: {
                  id: 100,
                  name: "Home Team",
                },
              },
              stats: {
                skaterStats: {
                  assists: 2,
                  goals: 1,
                  hits: 5,
                  penaltyMinutes: 2,
                },
              },
            },
          },
        },
        away: {
          team: {
            name: "Away Team",
          },
          players: {
            "ID2": {
              person: {
                id: 2,
                fullName: "Player Two",
                currentAge: 28,
                primaryNumber: "11",
                primaryPosition: {
                  name: "Right Wing",
                },
                currentTeam: {
                  id: 101,
                  name: "Away Team",
                },
              },
              stats: {
                skaterStats: {
                  assists: 1,
                  goals: 0,
                  hits: 3,
                  penaltyMinutes: 0,
                },
              },
            },
          },
        },
      },
    },
  };

  it("should transform the raw data into the desired format", () => {
    const transformedData = dataTransformer.transform(mockData);

    // Perform assertions to verify that the transformed data has the desired format
    // and contains the expected values
    expect(transformedData).toHaveLength(2);

    expect(transformedData[0]).toMatchObject({
      gameId: "2022020001",
      playerId: 1,
      playerName: "Player One",
      teamId: 100,
      teamName: "Home Team",
      playerAge: 25,
      playerNumber: "10",
      playerPosition: "Center",
      assists: 2,
      goals: 1,
      hits: 5,
      points: 3,
      penaltyMinutes: 2,
      opponnetTeam: "Away Team",
    });

    expect(transformedData[1]).toMatchObject({
      gameId: "2022020001",
      playerId: 2,
      playerName: "Player Two",
      teamId: 101,
      teamName: "Away Team",
      playerAge: 28,
      playerNumber: "11",
      playerPosition: "Right Wing",
      assists: 1,
      goals: 0,
      hits: 3,
      points: 1,
      penaltyMinutes: 0,
      opponnetTeam: "Home Team",
    });
  });
});