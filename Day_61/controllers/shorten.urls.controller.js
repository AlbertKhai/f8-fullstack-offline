const _ = require("lodash");

const dayjs = require("dayjs");
const dayjs_vi = require("dayjs/locale/vi");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const { createUrlId } = require("../utils/shortenUrl");
const { ShortenUrl } = require("../models/index");
const {
   validShortenUrl,
   validEditShortenUrl,
} = require("../helpers/controllers/rules.shorten.url");

const url = process.env.URL;

module.exports = {
   index: async (req, res) => {
      const [msg, typeMsg] = req.flash("msg");

      const { page = 1 } = req.query;
      const limit = 6;
      const offset = (page - 1) * limit;

      let { count, rows: shortenedUrls } = await ShortenUrl.findAndCountAll({
         where: { user_id: req.user.id },
         limit,
         offset,
         order: [["id", "desc"]],
      });

      const totalPage = Math.ceil(count / limit);

      const regexNameUrl = /(?:https?:\/\/)?((www\.)?([^\/]+))/;

      shortenedUrls = shortenedUrls.map(
         ({ original_url, shorten_url, password, visit, created_at }) => ({
            visit,
            password,
            idUrlShortend: shorten_url,
            shortenedUrl: `${url}/shorten-url/${shorten_url}`,
            originalUrl: original_url,
            uiShortenedUrl: `shorten-url/${shorten_url}`,
            uiOriginalUrl: original_url.match(regexNameUrl)[1],
            created: dayjs(created_at).locale(dayjs_vi).fromNow(),
         })
      );

      return res.render("shorten-urls/index", {
         req,
         dayjs,
         dayjs_vi,
         url,
         shortenedUrls,
         totalPage,
         page,
         offset,
         msg,
         typeMsg,
         layout: "layouts/modules",
      });
   },
   create: async (req, res) => {
      const [msg, typeMsg] = req.flash("msg");
      let [idUrlShortend] = req.flash("idUrlShortend");

      return res.render("shorten-urls/create", {
         req,
         idUrlShortend,
         url,
         msg,
         typeMsg,
         layout: "layouts/modules",
      });
   },
   handleCreate: async (req, res) => {
      const body = await req.validate(req.body, validShortenUrl(ShortenUrl));

      if (body) {
         let urlShortend, created;
         do {
            const id = body.customID ?? createUrlId(8);
            let data = {
               where: { shorten_url: id },
               defaults: {
                  user_id: req.user.id,
                  original_url: body.url,
                  shorten_url: id,
                  safe_navigation: body.safeNavigation,
                  visit: 0,
               },
            };

            if (body.password) data.defaults.password = body.password;

            [urlShortend, created] = await ShortenUrl.findOrCreate(data);
         } while (!created);

         req.flash("msg", ["Rút gọn thành công", "bg-success"]);
         req.flash("idUrlShortend", urlShortend.shorten_url);
      }
      return res.redirect("/shorten-urls/create");
   },
   edit: async (req, res) => {
      const { id } = req.params;
      const [msg, typeMsg] = req.flash("msg");

      try {
         if (_.isEmpty(req.old)) {
            const shortenedUrl = await ShortenUrl.findOne({
               where: { shorten_url: id, user_id: req.user.id },
            });
            if (!shortenedUrl) return res.render("not-found");
            const { original_url, shorten_url, safe_navigation, password } =
               shortenedUrl;
            req.old = {
               password,
               url: original_url,
               shortenedUrl: url + "/shorten-url/" + shorten_url,
               safeNavigation: safe_navigation,
            };
         }

         return res.render("shorten-urls/edit", {
            req,
            msg,
            typeMsg,
            layout: "layouts/modules",
         });
      } catch (error) {
         res.render("not-found");
      }
   },
   handleEdit: async (req, res) => {
      const { id } = req.params;
      const body = await req.validate(req.body, validEditShortenUrl());

      if (body) {
         const data = { password: body.password || null };
         if (body.safeNavigation) data.safe_navigation = true;

         const result = await ShortenUrl.update(data, {
            where: { shorten_url: id, user_id: req.user.id },
         });

         if (result) {
            req.flash("msg", ["Cập nhật thành công", "bg-success"]);
         } else {
            req.flash("msg", ["Cập nhật thất bại", "bg-danger"]);
         }
      }

      return res.redirect(`/shorten-urls/edit/${id}`);
   },
   handleDelete: async (req, res) => {
      const { id } = req.params;
      const result = await ShortenUrl.destroy({
         where: { shorten_url: id, user_id: req.user.id },
      });

      if (result) {
         req.flash("msg", ["Đã xóa liên kết rút gọn", "bg-success"]);
      } else {
         req.flash("msg", ["Xóa liên kết không thành công", "bg-danger"]);
      }

      return res.redirect("/shorten-urls");
   },
};
