# JobTrack — React Frontend

This frontend is intentionally prepared for a FastAPI backend-learning project.

## Run it

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Current state

The UI works with temporary in-memory React state. There is NO real backend yet.

Your FastAPI work will replace the temporary state with API requests.

Planned backend endpoints:

- POST /auth/register
- POST /auth/login
- GET /users/me
- GET /jobs
- POST /jobs
- GET /jobs/{job_id}
- PUT /jobs/{job_id}
- DELETE /jobs/{job_id}
- GET /dashboard/stats

The intentionally incomplete/backend-dependent parts are the next learning exercise.
