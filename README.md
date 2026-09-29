# SileyeAI

![SileyeAI landing page](./public/landing.png)

SileyeAI is a full-stack generative AI application I built as a hands-on learning project while following a **Code With Antonio** course.

The project gave me practical experience integrating multiple AI capabilities into a modern web application, while also working with authentication, database persistence, API routes, usage limits, subscriptions, and payments.

## Features

- AI conversation generation
- Code generation
- Image generation
- Music generation
- Video generation
- User authentication
- Usage limits and subscription management
- Responsive dashboard experience

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS  
**Authentication:** Clerk  
**Database:** PostgreSQL, Prisma ORM  
**AI integrations:** OpenAI, Replicate  
**Payments:** Stripe  
**UI & validation:** Radix UI, React Hook Form, Zod

## Architecture

SileyeAI uses the Next.js App Router for the application interface and server-side API routes. Authentication is handled with Clerk, while Prisma provides the data layer for PostgreSQL. Separate API routes support conversation, code, image, music, and video generation. Stripe is integrated for subscription functionality and webhooks.

## What I Practiced

Building this project helped me strengthen my understanding of:

- Full-stack development with Next.js and TypeScript
- Integrating generative AI APIs
- Building and consuming server-side API routes
- Authentication and protected application routes
- Database access with Prisma and PostgreSQL
- Usage tracking and subscription workflows
- Payment integration with Stripe
- Responsive UI development with Tailwind CSS
- Debugging and deploying a production-style web application

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Sileye00/sileye-ai.git
cd sileye-ai
npm install
```

Create a `.env` file and configure the environment variables required by the services used in the application. Do **not** commit API keys or secrets to GitHub.

Then initialize Prisma and start the development server:

```bash
npx prisma generate
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure

```text
app/
├── (auth)/          # Authentication pages
├── (dashboard)/     # Authenticated application experience
├── (landing)/       # Public landing page
└── api/             # AI, Stripe, and webhook API routes

components/          # Reusable UI components
lib/                 # Shared utilities and application logic
prisma/              # Prisma database schema
public/              # Images and static assets
```

## Acknowledgment

This project was originally built as part of a **Code With Antonio** course/tutorial. I used it as a hands-on learning project to deepen my understanding of full-stack development, generative AI integrations, authentication, databases, and subscription-based application architecture.

The repository is presented as a learning project and portfolio demonstration of the technologies and concepts I practiced.
