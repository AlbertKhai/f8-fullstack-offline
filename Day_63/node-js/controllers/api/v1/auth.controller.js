const passport = require("passport");

const {
   createJWtToken,
   refreshJwtToken,
   loginLocal,
   logout,
   getAuthRedirectUrl,
} = require("../../../services/api/v1/auth.service");

const UserTransformer = require("../../../transformers/clients/user.transformer");

module.exports = {
   login: async (req, res) => {
      const { error, accessToken, refreshToken } = await loginLocal(req.body);

      if (error) {
         return res.err(...error);
      }

      return res.success(200, "Success", {
         accessToken,
         refreshToken,
      });
   },
   profile: async (req, res) => {
      return res.success(200, "Success", new UserTransformer(req.user));
   },
   logout: async (req, res) => {
      const blacklist = await logout(req.user);

      if (blacklist) {
         return res.success(200, "Success");
      }

      return res.err(500, "Server Error");
   },
   refresh: async (req, res) => {
      const { error, accessToken, refreshToken } = await refreshJwtToken(
         req.body
      );

      if (error) {
         return res.err(...error);
      }

      return res.success(200, "Success", {
         accessToken,
         refreshToken,
      });
   },
   success: async (req, res) => {
      const { accessToken, refreshToken } = await createJWtToken(req.user.id);

      if (!accessToken || !refreshToken) {
         return res.err(500, "Server Error");
      }

      return res.success(200, "Success", {
         user: new UserTransformer(req.user),
         accessToken,
         refreshToken,
      });
   },
   failure: (req, res, next) => {
      return res.err(500, "Server Error");
   },
   google: (req, res, next) => {
      res = getAuthRedirectUrl(res); // thay thế res default = res custom để trả về urlRedirect
      passport.authenticate("google")(req, res, next);
   },
   github: (req, res, next) => {
      res = getAuthRedirectUrl(res); // thay thế res default = res custom để trả về urlRedirect
      passport.authenticate("github")(req, res, next);
   },
   handleGoogle: passport.authenticate("google", {
      failureFlash: false,
      failureRedirect: "/api/v1/auth/failure",
      successRedirect: "/api/v1/auth/success",
   }),
   handleGithub: passport.authenticate("github", {
      failureFlash: false,
      failureRedirect: "/api/v1/auth/failure",
      successRedirect: "/api/v1/auth/success",
   }),
};
