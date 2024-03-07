"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465, //587, 25
   secure: true,
   auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "chugomeo@gmail.com",
      pass: "hdyg pini rbyf xqgd",
   },
});

module.exports = async (to, subject, message) => {
   // send mail with defined transport object
   const info = await transporter.sendMail({
      from: `"👻" <chugomeo@gmail.com>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: message, // html body
   });

   return info;
};
