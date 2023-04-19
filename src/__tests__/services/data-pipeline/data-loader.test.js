import { DataLoader } from "../../../services/data-pipeline/data-loader.js";
import { Nhl } from "../../../sequelize/model.js";

jest.mock("../../../sequelize/model");

describe("DataLoader", () => {
  const dataLoader = new DataLoader();
  const mockData = [
    {
      id: "202202000110",
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
    },
    {
      id: "202202000111",
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
    },
  ];

  beforeEach(() => {
    Nhl.bulkCreate.mockClear();
  });

  it("should load the data into the database", async () => {
    Nhl.bulkCreate.mockResolvedValue(mockData);

    const result = await dataLoader.load(mockData);

    expect(Nhl.bulkCreate).toHaveBeenCalledTimes(1);
    expect(Nhl.bulkCreate).toHaveBeenCalledWith(mockData, expect.any(Object));
    expect(result).toEqual(mockData);
  });
});