# Backend

## Environment
Create a `.env` file in `backend/` with:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

## Scripts
- `npm start` — start server
- `npm run dev` — nodemon (if installed)

## Endpoints
- `GET /health` — health check
- `GET /generate-plan` — simple hello message
- `POST /generate-plan` — zero-shot AI trip plan
  - Body JSON:
    ```json
    {
      "destination": "Paris",
      "days": 3,
      "interests": ["food", "culture", "shopping"]
    }
    ```
  - Response JSON:
    ```json
    { "plan": "...generated itinerary..." }
    ```
