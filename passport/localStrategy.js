const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "Email not registered" });

      if (!user.password)
        return done(null, false, { message: "Use OAuth to login" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return done(null, false, { message: "Invalid credentials" });

      return done(null, user);
    }
  )
);
