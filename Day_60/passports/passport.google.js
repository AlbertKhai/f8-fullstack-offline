var GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const { User, Provider } = require("../models/index");

module.exports = new GoogleStrategy(
   {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: `${process.env.URL}/auth/google/callback`,
      scope: ["email", "profile"],
   },
   async (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json;

      let [provider] = await Provider.findOrCreate({
         where: { name: "google" },
         defaults: { name: "google" },
      });

      const [user] = await User.findOrCreate({
         where: { email, provider_id: provider.id },
         defaults: { name, email, provider_id: provider.id },
      });

      done(null, user);
   }
);
