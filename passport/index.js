const passport = require("passport");
require("./googleStrategy");
require("./discordStrategy");
require("./localStrategy");
passport.serializeUser((user, done) => {
  done(null, user.userID);
});

passport.deserializeUser(async (userID, done) => {
  try {
    const user = await User.findOne({ userID }).select("-password -OAuths");
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
