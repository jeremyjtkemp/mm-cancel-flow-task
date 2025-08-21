Hey Jeremy,

Here is your take‑home challenge.

Your task is to convert the provided Figma design into a fully functional subscription‑cancellation flow. Implement it exactly on mobile and desktop and implement a deterministic A/B downsell split test.

##Important: We have already built this cancellation flow - this is an evaluation task only. Your code will never be used in production.

#What we provide

Repository zip (download here) with Next.js + TypeScript + Tailwind scaffold, local Supabase setup, basic client, and seed.sql.
Figma file (attached) for the cancellation flow.
Main image (attached) used in the flow.
Profile image (attached) used in the flow.

#Critical features

Progressive flow: Implement the exact Figma journey with pixel‑perfect fidelity on mobile and desktop; handle all interactions and state.
Deterministic A/B (50/50): Assign variant once on first entry via secure RNG; persist to cancellations.downsell_variant; reuse on return. Variant B offers $10 off ($25→$15, $29→$19).
Data persistence: Mark subscription pending_cancellation; create cancellation with user_id, downsell_variant, reason, accepted_downsell, created_at.
Security: RLS policies; input validation; protect against CSRF/XSS; handle sensitive data safely.
Reproducible setup: npm install → npm run db:setup → npm run dev.

#Out of scope (do not implement)

Payment processing (stub only)
User authentication (use mock user)
Email notifications
Analytics tracking

#Getting started

Unzip the repo and open it in your editor.
Run npm install.
Run npm run db:setup to seed the database locally.
Run npm run dev to start development.

#Repo & submission

Name your GitHub repository "mm-cancel-flow-task-{firstName}" and push as you go.
When you're finished, push your latest changes and visit this link to submit (no need to email me to confirm submission).

#Timeline

Submit within 72 hours of receiving this email. This means your deadline is Saturday, August 23, 2025 at 8:54 AM EDT.

#AI tooling

Using Cursor, ChatGPT, Copilot, etc. is encouraged — use whatever accelerates build time, but you must understand the code (we will ask specific questions about it).

#Questions

Please review all materials before you ask questions. If you still have questions after reading & watching everything, reply to this email and I'll get back to you ASAP.