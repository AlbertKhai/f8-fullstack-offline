import { config } from "./config.js";
const { SERVER_API } = config;

export const client = {
   serverApi: SERVER_API,
   token: null,
   isRefreshingToken: false,
   setUrl: function (url) {
      this.serverApi = url;
   },
   setToken: function (token) {
      this.token = token;
   },
   send: async function (url, method = "GET", body = null) {
      url = `${this.serverApi}${url}`;
      const headers = {
         "Content-Type": "application/json",
      };

      if (this.token) {
         headers["Authorization"] = `Bearer ${this.token}`;
      }

      const options = {
         method,
         headers,
      };

      if (body) {
         options.body = JSON.stringify(body);
      }

      let response = await fetch(url, options);

      let data = await response.json();

      if (!response.ok) {
         switch (response.status) {
            case 401:
               if (this.isRefreshingToken) {
                  break;
               }

               try {
                  await this.refreshToken();
                  headers["Authorization"] = `Bearer ${this.token}`;
                  response = await fetch(url, options);
                  data = await response.json();
                  if (!response.ok) {
                     throw new Error(data.message);
                  }
               } catch (error) {
                  throw error;
               }
               break;

            default:
               throw new Error(data.message || "Request failed");
         }
      }

      return { res: response, data };
   },

   //http get
   get: function (url) {
      return this.send(url);
   },
   //http post
   post: function (url, body) {
      return this.send(url, "POST", body);
   },
   //http put
   put: function (url, body) {
      return this.send(url, "PUT", body);
   },
   //http patch
   patch: function (url, body) {
      return this.send(url, "PATCH", body);
   },
   //http delete
   delete: function (url) {
      return this.send(url, "DELETE");
   },

   refreshToken: async function () {
      const userData = localStorage.getItem("login_token");
      if (!userData) {
         throw new Error("User is not logged in");
      }

      const refreshToken = JSON.parse(userData).refreshToken;
      if (!refreshToken) {
         throw new Error("No refresh token found");
      }

      this.isRefreshingToken = true;
      const { res, data: newToken } = await this.post("/auth/refresh-token", {
         refreshToken,
      });

      if (!res.ok) {
         throw new Error(newToken.message);
      }

      const token = newToken.data.token;
      localStorage.setItem("login_token", JSON.stringify(token));
      this.token = token.accessToken;
   },
};
