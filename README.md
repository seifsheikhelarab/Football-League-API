# Football League API

Football League API is a backend serivce to handle all players signed to different teams.

## Features/Routes

- Get all teams
- Get one team's details
- Get players by team
- Get one player's details
- Search for a player's name
- Add new players, delete retired ones
- Transfer a player from a team to another
- Change a player's salary
- Change team shirt color

## Project Structure

```bash
src/
  app.ts
  router.ts

  config/
    logger.config.ts

  controllers/
    player.controller.ts
    team.controller.ts

collection/
prisma/
eslint.config.ts
tsconfig.json
```

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Installation

```bash
npm install
```

### Configuration

- Edit environment variables in `.env` to set up services as needed.

- Create a `.env` file in the root directory with:

```env
# Server Configuration
DATABASE_URL="postgresql://name:pass@localhost:5432/football_league"
PORT = 4221
```
