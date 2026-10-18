# Vocabulator

This is going to be a vocab trainer with flash cards. This project is developed through the hack club ysws "terra"

**Live Demo:** [vocabulator](https://vocabulator-cyan.vercel.app)
## At this point

This is the state of the third preparation week of terra. I tried creating the supabase db/auth system in this week. In this week i implemented login and register and password reset. I also implemented the creation of your own deck and learning of your deck. In the settings page you can change your Username and log out of your account.

## Features

At this point you can create your own flashcard decks and learn these. Theyre synced trough your account at the supabase auth system db. When you forget your password you can reset it trough the password reset form and get an email with a link for a new password. Every site which should be private without login checks your session tokes and redirects you to the auth page if you are not allowed there.

## Tech Stack

- Next.JS with Tailwind CSS and TypeScript
- Backend Supabase

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
