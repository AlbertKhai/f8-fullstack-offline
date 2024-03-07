var GitHubStrategy = require("passport-github2").Strategy;
const { User, Provider } = require("../models/index");

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, URL } = process.env;

module.exports = new GitHubStrategy(
   {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${URL}/api/v1/auth/github/callback`,
      scope: ["user:email"],
   },
   async (accessToken, refreshToken, profile, done) => {
      const {
         username: name,
         emails: [{ value: email }],
         photos: [{ value: avatar_url }],
      } = profile;

      const [user] = await User.findOrCreate({
         where: { email },
         defaults: { name, email, avatar_url },
      });

      const [provider] = await Provider.findOrCreate({
         where: { name: "github", user_id: user.id },
         defaults: { name: "github", user_id: user.id },
      });

      user.providerId = provider.id;

      done(null, user);
   }
);
