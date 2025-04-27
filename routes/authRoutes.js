const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const Session = require("../models/Session");
const GenerateId = require("../utils/GenerateId");

const router = express.Router();

// Helper to create a session token and set cookie
async function createSession(userID, res) {
  const token = crypto.randomUUID();
  await Session.create({ userID, token });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

// Register
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userID = await GenerateId(User, "userID");

  const newUser = new User({
    userID,
    name: { first: firstName, last: lastName },
    email,
    password: hashedPassword,
  });

  await newUser.save();

  await createSession(newUser.userID, res);

  res.status(201).json({ message: "Registered successfully" });
});

// Login
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    await createSession(user.userID, res);

    res.json({ message: "Logged in successfully" });
  })(req, res, next);
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    await createSession(req.user.userID, res);
    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  }
);

// Discord OAuth
router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  async (req, res) => {
    await createSession(req.user.userID, res);
    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  }
);

// Logout
router.post("/logout", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await Session.deleteOne({ token });
    res.clearCookie("token");
  }
  res.json({ message: "Logged out successfully" });
});

// Get Current User
router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const session = await Session.findOne({ token });
  if (!session) return res.status(401).json({ message: "Invalid session" });

  const user = await User.findOne({ userID: session.userID }).select(
    "-password -OAuths"
  );
  res.json(user);
});

module.exports = router;
