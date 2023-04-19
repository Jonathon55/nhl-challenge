# sportradar-advanced-challenge
Data Pipeline using NHL API

## Description
A Suite of Data Pipeline Features using NHL Game Data
1. Monitors game status, looking for when games start, When a game starts (triggers process 2)
2. Ingests live game data from the NHL - Process will only run when games are live
3. Can query your database for up to date stats, during and after a live game

## Setup + Environment Variables
- `npm install`
- create `.env` file
- copy property names over from `.env.example` and set appropriate values, `.env.example` has reasonable defaults for each value unless blank
- `db:migrate-up` - This will create the database tables locally once connected to a db

## Feature 1: Monitor game status
- `npm start monitor-nhl`
- This will start a process that intermittently checks for live nhl games
- If a nhl game goes live, will trigger **Feature 2**, and continue to check for more games
- Will not close at the end of a live game

## Feature 2: Check for Live Games & Record Live Data
- `npm start monitor-nhl:live`
- This will start a process that checks the NHL for live games
- If a an NHL game is live, system will ingest data from this game and any other game that is live
- Once there are no more live NHL games this process will close

## Feature 3: Can Query Database for Game data
- `npm start monitor-nhl:game {GameID}`
- This will return a box score to the CLI for this particular game
- If no game data exists you can use Feature 4

## Feature 4: Injest The whole seasons worth of data
- `npm start ingest-season-data {seasonID}`
- This season's season ID is 20222023


## Stretch Features
- Return a list of games currently live
- Load all games of a season and view status
- Return a list of game Ids, along with teams and score - for a season, or a particular team
- Configurable Environments

## Run tests
This will run jest tests:
- `npm run test`
