# Auditorium permissions

Server-rendered Node.js application for submitting auditorium registration requests at SVIT Vasad.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:3000/login` for the approval panel. The request form is open to everyone at `http://localhost:3000/request`. Without Supabase credentials, requests are held in memory for local development.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor, then copy `.env.example` to `.env` and provide `SUPABASE_URL` plus a server-side key. Use the service role key only in the Node server environment; never expose it to browser code.

Approval order: the selected department head, then the electrician, then the principal, then maintenance. Every logged-in role can see request status. Admin can manage user IDs and see all requests.

Admins can add auditorium options from the admin panel. Run `supabase/schema.sql` to create the persistent `auditoriums` table; until then, the two default rooms are available in local fallback mode.