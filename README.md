# VIMS — Village Information Management System

A secure, bilingual-ready web application foundation for managing village households, families and residents in Sri Lanka.

## Development status
This repository is being developed on `development/web-foundation`. The initial README is the only file added to `main` to establish the repository history. All application development belongs on the development branch.

## Planned foundation
- Welcome / sign-in entry screen and dashboard
- Household, family and resident records
- Optional ethnicity, religion and denomination/tradition fields
- Individual and whole-family exports
- Role-based access, audit history and protected data storage

## Security
Never commit real resident data, credentials, API keys, or environment files. Production personal data must be stored in a private backend with authentication and correctly configured row-level security. The frontend demo uses sample figures only.

## Local development
Install dependencies with `npm install`, then run `npm run dev`.
