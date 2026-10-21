# ConnectUP — Backend

**ConnectUP** is a full-stack event discovery and management platform developed as a Bachelor's thesis project at the Faculty of Mathematics and Computer Science, University of Bucharest.

This repository contains the **backend REST API**, developed with **Node.js, Express, and TypeScript**, using **Prisma ORM** and **PostgreSQL**. It handles application business logic, authentication, event management, payments, notifications, and user interactions.

## Tech stack

- **Node.js + Express** — REST API
- **TypeScript** — typed server-side code
- **PostgreSQL** — relational database
- **Prisma ORM** — database access and modeling
- **JWT** — token-based authentication and protected routes
- **Stripe API** — payment intents for paid events
- **Google Maps API** — geocoding and location-related services
- **SMTP email service** — account verification, reminders, and mention notifications

## Key features

### Authentication and user management

- Two-step registration with pending accounts and email verification tokens.
- Login and role-based access for **members** and **administrators**.
- JWT authentication for protected requests.
- Password recovery and account/profile updates.
- User interests managed through tags.

### Event management

- Create and manage events with titles, descriptions, locations, dates, images, and tags.
- Host ownership and participant tracking.
- Support for free and paid events, including payment-related configuration.
- Event search, sorting, filtering, and favorites.

### Payments and notifications

- Stripe payment intent integration for paid-event registration.
- Email notifications for account activation, upcoming-event reminders, and user mentions.
- Notification logging to support auditing and duplicate prevention.

### Community and analytics

- Event reviews, ratings, questions, and user mentions.
- Aggregated participant statistics, including age, gender, and interest-tag distributions.
- Geocoding and nearby-event discovery using geographic coordinates.

## Architecture

The backend follows a layered structure that separates API handling, business logic, and persistence.

```
Frontend (React + TypeScript)
              |
              v
       Express REST API
              |
    Authentication / API layer
              |
       Service layer
  (Auth, Events, Members,
 Payments, Notifications, Geocoding)
              |
      Repository / Prisma
              |
          PostgreSQL

External integrations: Stripe, Google Maps, SMTP
```

## Database model

The thesis describes entities and relationships including:

| Area | Example tables |
| --- | --- |
| Accounts and roles | `users`, `members`, `roles`, `pending_members` |
| Events and categorization | `events`, `tags`, event-tag relationships |
| Participation and favorites | `event_attendees`, `favorites` |
| Community | `reviews`, `questions` |
| Payments | `paid_events` |
| Account recovery | `reset_password_requests`, `change_password_requests`, `change_email_requests` |
| Notifications | `notification_logs` |

A member can attend multiple events, and an event can have multiple members; this many-to-many relationship is represented through `event_attendees`.

## Running locally

Prerequisites include **Node.js**, **PostgreSQL**, and credentials for the external services used by the application.

```
npm install
```

Configure the environment variables required by the actual codebase (database connection, JWT secret, email service, Stripe, Google Maps, and frontend origin where applicable).

After configuring PostgreSQL, use the Prisma commands appropriate for the repository's migration workflow. Run the server using the script defined in `package.json`.

## Security considerations

- Protected API routes use JWT authentication.
- Authorization distinguishes administrator and member capabilities.
- Email confirmation and password-reset flows use temporary tokens.
- Stripe handles sensitive payment-card data; the application does not need to process raw card details.
- Keep API keys, database credentials, and JWT secrets outside version control.

## Frontend integration

This API is designed to serve the **ConnectUP Frontend** repository.

https://github.com/RaresDDB/ConnectUP-frontend

## Project context

Developed as an individual Bachelor's thesis project at the **University of Bucharest, Faculty of Mathematics and Computer Science**.

**Author:** Costin-Rareș-Călin Pârlea
