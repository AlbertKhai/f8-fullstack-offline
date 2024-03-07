const {
   validPasswordUrl,
} = require("../helpers/controllers/rules.shorten.url");
const { ShortenUrl } = require("../models/index");
const url = process.env.URL;

module.exports = {
   index: async (req, res) => {
      const { id } = req.params;
      const [msg, typeMsg] = req.flash("msg");
      const shortenUrl = await ShortenUrl.findOne({
         where: { shorten_url: id, user_id: req.user.id },
      });

      if (shortenUrl) {
         const { original_url, shorten_url, safe_navigation, password, visit } =
            shortenUrl;

         await ShortenUrl.update(
            { visit: visit + 1 },
            { where: { shorten_url: id, user_id: req.user.id } }
         );

         if (!safe_navigation) return res.redirect(original_url);

         req.baseUrl = "/shorten-urls";

         const [pass] = req.flash("password");

         if (password && !pass) {
            return res.render("shorten-urls/password", {
               req,
               msg,
               typeMsg,
               layout: "layouts/modules",
            });
         }

         const shortenedUrl = url + "/shorten-url/" + shorten_url;
         return res.render("shorten-urls/safe-navigation", {
            req,
            shortenedUrl,
            original_url,
            layout: "layouts/modules",
         });
      }

      return res.render("not-found", {
         req,
         layout: "layouts/troubleshooting",
      });
   },
   handlePassword: async (req, res) => {
      const { id } = req.params;
      req.baseUrl = "/shorten-urls";
      const body = await req.validate(req.body, validPasswordUrl());

      if (body) {
         const shortenUrl = await ShortenUrl.findOne({
            where: {
               shorten_url: id,
               user_id: req.user.id,
               password: body.password,
            },
         });

         if (shortenUrl) {
            req.flash("password", true);
         } else {
            req.flash("msg", ["Mật khẩu không chính xác", "bg-danger"]);
         }
      }

      return res.redirect(`/shorten-url/${id}`);
   },
};
