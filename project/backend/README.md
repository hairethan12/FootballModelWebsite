# Football Analytics API

A .NET 9 Web API for managing football team analytics and game data.

## Architecture

This application follows Clean Architecture principles with the following projects:

- **FootballAnalytics.API**: Web API layer with controllers and configuration
- **FootballAnalytics.Core**: Domain entities and interfaces
- **FootballAnalytics.Infrastructure**: Data access and repository implementations

## Features

- Game management (CRUD operations)
- Offense analysis tracking
- Opponent analysis tracking
- RESTful API endpoints
- Entity Framework Core with SQL Server
- Repository pattern implementation

## Getting Started

### Prerequisites

- .NET 9 SDK
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code

### Setup

1. Navigate to the backend directory
2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` if needed

4. Create and seed the database:
   ```bash
   dotnet ef database update -p FootballAnalytics.Infrastructure -s FootballAnalytics.API
   ```

5. Run the application:
   ```bash
   dotnet run --project FootballAnalytics.API
   ```

The API will be available at `https://localhost:7000` with Swagger documentation at `/swagger`.

## API Endpoints

### Games
- `GET /api/games` - Get all games
- `GET /api/games/{id}` - Get game by ID
- `GET /api/games/upcoming` - Get next upcoming game
- `POST /api/games` - Create new game
- `PUT /api/games/{id}` - Update game
- `DELETE /api/games/{id}` - Delete game

### Analysis
- `GET /api/analysis/offense/{gameId}` - Get offense analysis for game
- `GET /api/analysis/opponent/{gameId}` - Get opponent analysis for game
- `POST /api/analysis/offense` - Create offense analysis
- `POST /api/analysis/opponent` - Create opponent analysis
- `PUT /api/analysis/offense/{id}` - Update offense analysis
- `PUT /api/analysis/opponent/{id}` - Update opponent analysis

## Database Schema

The application uses Entity Framework Code First with the following main entities:

- **Game**: Stores game information (opponent, date, venue, win probability)
- **OffenseAnalysis**: Tracks offensive metrics for each game
- **OpponentAnalysis**: Tracks opponent defensive metrics for each game

## Configuration

Update `appsettings.json` to configure:
- Database connection string
- Logging levels
- CORS settings for frontend integration