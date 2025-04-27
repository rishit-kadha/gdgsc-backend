# GDGSC Backend

This repository contains the backend for the GDGSC (GameDev Guild Students Club) project. It is built with Node.js, Express, MongoDB, and various authentication strategies using Passport.js.

## Features

- **User Authentication**: Supports registration, login, and authentication through Google, Discord, and local credentials.
- **Session Management**: Uses secure cookies and sessions for maintaining user state.
- **Database**: MongoDB and Mongoose for storing user and session data.
- **API Routes**: RESTful API routes for managing user data and authentication.

## Requirements

Before running the project, make sure you have the following:

- [Node.js](https://nodejs.org/) installed.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database.
- Google and Discord OAuth credentials for authentication.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/rishit-kadha/gdgsc-backend.git
   cd gdgsc-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   MONGO_URI="your_mongo_connection_string"
   GOOGLE_CLIENT_ID="your_google_oauth_client_id"
   GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
   DISCORD_CLIENT_ID="your_discord_oauth_client_id"
   DISCORD_CLIENT_SECRET="your_discord_oauth_client_secret"
   SESSION_SECRET="your_session_secret"
   BASE_URL="http://localhost:3000"
   FRONTEND_URL="http://localhost:5173"
   NODE_ENV="development"

   ```

   Replace the placeholders with your actual credentials.

4. Run the development server:

   ```bash
   npm run dev
   ```

   This will start the server with `nodemon`, which automatically restarts the server when file changes are detected.

5. Alternatively, for production:

   ```bash
   npm start
   ```

## Endpoints

### Authentication

- **GET `/auth/google`**: Redirects to Google for authentication.
- **GET `/auth/google/callback`**: Callback URL after successful Google login.
- **GET `/auth/discord`**: Redirects to Discord for authentication.
- **GET `/auth/discord/callback`**: Callback URL after successful Discord login.
- **POST `/auth/logout`**: Logs the user out by clearing the session.
- **GET `/auth/me`**: Gets the currently logged-in user’s information.

### User Management

- **POST `/register`**: Registers a new user with a `firstName`, `lastName`, `email`, and `password`.
- **POST `/login`**: Logs in a user with their email and password.

## Dependencies

- `bcryptjs`: For hashing passwords.
- `connect-mongo`: For session storage in MongoDB.
- `cookie-parser`: For parsing cookies.
- `cors`: To handle CORS (Cross-Origin Resource Sharing).
- `dotenv`: To load environment variables from `.env` file.
- `express`: Web framework for Node.js.
- `express-session`: For session management.
- `jsonwebtoken`: For generating and verifying JSON Web Tokens.
- `mongodb` & `mongoose`: For MongoDB integration.
- `passport`: Authentication middleware for Node.js.
- `passport-discord`, `passport-google-oauth20`, `passport-local`: Authentication strategies for Discord, Google, and local login.



## Author

Created by [Rishit Kadha](https://github.com/rishit-kadha).
