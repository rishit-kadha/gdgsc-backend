const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const User = require("../models/User");
const GenerateId = require("../utils/GenerateId");

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/discord/callback`,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.email;
      let user = await User.findOne({ email });

      if (!user) {
        const userID = await GenerateId(User, "userID");
        user = await User.create({
          userID,
          name: {
            first: profile.username || "",
            last: "",
          },
          email,
          avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          OAuths: [
            {
              userID: userID,
              provider: "discord",
              providerAccountID: profile.id,
            },
          ],
        });
      } else {
        if (!user.OAuths.some((o) => o.provider === "discord")) {
          user.OAuths.push({
            userID: user.userID,
            provider: "discord",
            providerAccountID: profile.id,
          });
          await user.save();
        }
      }

      return done(null, user);
    }
  )
);
