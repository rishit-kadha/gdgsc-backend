const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const GenerateId = require("../utils/GenerateId");

module.export = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          const userID = await GenerateId(User, "userID");
          user = await User.create({
            userID,
            name: {
              first: profile.name.givenName || "",
              last: profile.name.familyName || "",
            },
            email,
            avatar: profile.photos[0]?.value || "",
            OAuths: [
              {
                userID: userID,
                provider: "google",
                providerAccountID: profile.id,
              },
            ],
          });
        } else {
          if (!user.OAuths.some((o) => o.provider === "google")) {
            user.OAuths.push({
              userID: user.userID,
              provider: "google",
              providerAccountID: profile.id,
            });
            await user.save();
          }
        }

        return done(null, user);
      }
    )
  );
};
