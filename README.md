# Tip a Chef

Tip a Chef gives chefs a personal profile and QR code so diners can support them directly. Chefs can also publish recipes, advertise private-chef services, and receive hiring inquiries.

## Stack

- Next.js 14 App Router, React, TypeScript, and Tailwind CSS
- Supabase Auth, Postgres, Row Level Security, and Storage
- Stripe Checkout and Stripe Connect Express

## Local setup

1. Copy `.env.example` to `.env.local` and provide the required credentials.
2. Run `supabase/schema.sql` for a new Supabase project. For an existing deployment, review and run `supabase/migration.sql`.
3. Create public `avatars` and `covers` storage buckets with owner-write policies.
4. Register `/api/stripe/webhook` in Stripe and subscribe to `checkout.session.completed`.
5. Install dependencies with `npm ci`, then run `npm run dev`.

## Verification

Run `npm run verify` before deployment. This performs linting, TypeScript validation, and a production build.

## Payment disclosure

Creating a profile is free. Tip a Chef deducts a 5% platform fee. The remaining 95% is routed to the chef's connected Stripe account before Stripe processing fees. Product and marketing copy must use this wording consistently.

## Trust rules

- Never display generated activity as customer or marketplace data.
- Label prototypes and example profiles clearly.
- Only use “verified” when a documented verification process and database state support it.
- Update `dateModified` only after a real editorial review.
- Keep all service-role operations server-only and authenticated or webhook-verified.
