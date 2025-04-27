const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./passport"); // Import Passport setup
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./middlewares/Database.js");
const authRoutes = require("./routes/authRoutes"); // Importing the auth routes

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS config (important for separate frontend-backend setup)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g., "http://localhost:5173"
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Express session setup with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true, // true in production for HTTPS
      sameSite: "none", // Must be 'none' for cross-site cookies
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes); // Auth routes are handled

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
