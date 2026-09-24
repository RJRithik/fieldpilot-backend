# FieldPilot Backend (token endpoint)

This tiny backend does ONE job: it safely gives the frontend a temporary,
one-time-use AssemblyAI token, so the real API key never has to be exposed
in the browser or committed to GitHub.

## Files
- `api/token.js` — the actual endpoint. Vercel automatically publishes this
  at `/api/token` once deployed.
- `vercel.json` — small config file Vercel reads automatically.
- `.gitignore` — makes sure secret files never get uploaded to GitHub.

## Setup (no local install needed)
1. Create a new GitHub repository and upload these files (see chat for
   step-by-step instructions).
2. Import that repository into Vercel.
3. In the Vercel project's Settings → Environment Variables, add:
   - Name: `ASSEMBLYAI_API_KEY`
   - Value: (your real AssemblyAI API key — paste it only here, nowhere else)
4. Deploy. Vercel will give you a URL like `https://fieldpilot-backend.vercel.app`.
5. Test it by opening `https://fieldpilot-backend.vercel.app/api/token` in a
   browser. You should see a small JSON response containing a "token" field.
   If you see an error instead, read the "error" message — it explains what's wrong.

## Security notes
- The real API key is set as a Vercel Environment Variable, never written in
  any file that gets uploaded to GitHub.
- This endpoint only ever returns a short-lived, single-use token — never
  the real key.
