# Vocabulator

This is going to be a vocab trainer with flash cards. This project is developed through the hack club ysws "terra"

**Live Demo:** [vocabulator](https://vocabulator-cyan.vercel.app)

## At this point

This is the state of the first week of terra. I created edit and delete Decks this week and i created an function where you can scan your vocabs and get a vocab deck.

## Features

At this point you can create your own flashcard decks and learn these. They are synced trough your account at the supabase auth system db. When you forget your password you can reset it trough the password reset form and get an email with a link for a new password. Every site which should be private without login checks your session tokes and redirects you to the auth page if you are not allowed there. You can delete and edit your decks. Also you can scan a vocab page and an ocr model generatess your deck out of it (experimental).

## Tech Stack

- Next.JS with Tailwind CSS and TypeScript
- Backend Supabase
- AI Hackclub AI

## Running it locally

To run this project locally you must clone the repo and have nodejs installed. Then you can run following commands. You need to create an .env.local file see .env.example for an example.

```bash
git clone https://github.com/DundreDE/vocabulator.git
cd vocabulator
npm install
npm run dev
```

Or to test the production build instead:

```bash
git clone https://github.com/DundreDE/vocabulator.git
cd vocabulator
npm install
npm run build
npm run start
```

## AI Usage

I used AI to answer some Tailwind CSS, Supabase and TypeScript questions.
