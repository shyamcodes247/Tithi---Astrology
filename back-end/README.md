# Tithi Backend

This is the backend server for the Tithi Astrology Application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3001
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /health`
  - Returns the server status

### Astrology API
- `POST /api/astrology/planets`
  - Request body: Birth details (year, month, date, hours, minutes, seconds, latitude, longitude, timezone)
  - Returns: Planetary positions data calculated by our custom astrology engine

## Features

- Custom astrology calculation engine
- Input validation
- Error handling
- RESTful API design

## Development

- `npm run dev`: Start the development server with hot reloading
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm test`: Run tests 