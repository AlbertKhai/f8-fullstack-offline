import { config } from "./config.js";
const { SERVER_API } = config;

export const client = {
   send: async function (url, method = "GET", body = null) {
      url = `${SERVER_API}${url}`;
      const options = {
         method,
         headers: {
            "Content-Type": "application/json",
         },
      };

      if (body) {
         options.body = JSON.stringify(body);
      }

      const res = await fetch(url, options);

      const data = await res.json();

      return { res, data };
   },

   // http post
   get: function (url) {
      return this.send(url);
   },

   // http put
   put: function (url, body) {
      return this.send(url, "PUT", body);
   },

   // http patch
   patch: function (url, body) {
      return this.send(url, "PATCH", body);
   },

   // http delete
   delete: function (url) {
      return this.send(url, "DELETE");
   },
};
