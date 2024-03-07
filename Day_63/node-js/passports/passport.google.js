var GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, Provider } = require("../models/index");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, URL } = process.env;

module.exports = new GoogleStrategy(
   {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${URL}/api/v1/auth/google/callback`,
      scope: ["email", "profile"],
   },
   async (accessToken, refreshToken, profile, done) => {
      const { name, email, picture: avatar_url } = profile._json;
      let [user] = await User.findOrCreate({
         where: { email },
         defaults: { name, email, avatar_url, status: true },
      });

      const [provider] = await Provider.findOrCreate({
         where: { name: "google", user_id: user.id },
         defaults: { name: "google", user_id: user.id },
      });

      user.providerId = provider.id;

      done(null, user);
   }
);
