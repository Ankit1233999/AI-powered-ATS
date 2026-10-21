# ATS backend (Week 1)

## Run locally

1. Copy `.env.example` to `.env` and set a strong `JWT_SECRET`.
2. Start MongoDB locally or set `MONGODB_URI` to your MongoDB deployment.
3. Run `npm install` and `npm run dev`.

## API overview

- `POST /api/auth/register` — create an Applicant account. Pass `role: "recruiter"` and the configured `recruiterInviteCode` to create a Recruiter.
- `POST /api/auth/login` — sign in and receive a bearer token.
- `GET /api/auth/me` — current account.
- `GET /api/jobs` — public job board (open, non-archived jobs).
- `GET|POST|PATCH|DELETE /api/jobs/manage...` — recruiter-only job management. DELETE archives the job.

Use `Authorization: Bearer <token>` for protected endpoints.
