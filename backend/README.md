# ATS backend (Weeks 1–2)

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

## Week 2 application API

- `POST /api/applications` — applicant-only multipart submission. Send `jobId`, `resume`, and optional `coverLetter`.
- `GET /api/applications/mine` — an applicant's application history.
- `GET /api/applications/manage` — recruiter pipeline for applications to their jobs.
- `PATCH /api/applications/:id/stage` — moves an application through `applied`, `interview`, or `offered`.
- `GET /api/applications/:id/resume` — returns a five-minute, authorized download URL.

Resumes are restricted to PDF or DOCX files up to 5 MB. Set `AWS_REGION` and `AWS_S3_BUCKET` from `.env.example`; the bucket must remain private. The service stores files with server-side AES-256 encryption and exposes only temporary URLs.
