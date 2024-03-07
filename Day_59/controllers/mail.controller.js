const { string } = require("yup");
const { Mailbox } = require("../models/index");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

const sendMail = require("../utils/mail");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

module.exports = {
   mail: async (req, res) => {
      const msg = req.flash("msg");
      const { id: user_id } = req.session.user;

      let mailboxes = await Mailbox.findAll({ where: { user_id } });

      return res.render("mail/index", {
         req,
         msg,
         mailboxes,
         dayjs,
         layout: "layouts/layout-mail",
      });
   },
   detail: async (req, res) => {
      const id = req.params.id;

      let mailbox = await Mailbox.findByPk(id);

      return res.render("mail/detail", {
         req,
         mailbox,
         dayjs,
         layout: "layouts/layout-mail",
      });
   },
   sendMail: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");

      return res.render("mail/send", {
         req,
         msg,
         typeMsg,
         layout: "layouts/layout-mail",
      });
   },
   handleSendMail: async (req, res) => {
      const body = await req.validate(req.body, {
         mailTo: string()
            .required("Xin vui lòng nhập email người nhận")
            .email("Xin vui lòng nhập đúng định dạng email người nhận"),
      });

      if (body) {
         const { id: user_id, name } = req.session.user;
         const token_mail = uuidv4();
         let { mailTo, mailSubject, mailContent } = body;

         await Mailbox.create({
            mail_to: mailTo,
            mail_subject: mailSubject,
            mail_content: mailContent,
            user_id,
            token_mail,
         });

         mailContent += `<img style="opacity: 0;" src="https://khai-k4-nodemailer.vercel.app/mail/img/${token_mail}" alt="lỗi tải">`;
         await sendMail(mailTo, mailSubject, mailContent, name);

         req.flash("msg", `Đã gửi mail tới ${body.mailTo}`);
         req.flash("typeMsg", "bg-success");
         req.flash("old", { mailTo: body.mailTo });
      }

      return res.redirect("/mail/send");
   },
   handleViewed: async (req, res) => {
      const token_mail = req.params.token;
      if (uuidValidate(token_mail)) {
         await Mailbox.update({ viewed: true }, { where: { token_mail } });
      }

      const base64Image =
         "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+BAwAEnzF9Ue4AAAAASUVORK5CYII=";
      const imgBuffer = Buffer.from(base64Image, "base64");

      res.writeHead(200, {
         "Content-Type": "image/png",
         "Content-Length": imgBuffer.length,
      });
      res.end(imgBuffer);
   },
};
