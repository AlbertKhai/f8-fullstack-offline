import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

import "./assets/Style.scss";

import Provider from "./core/Provider.jsx";

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const domain = import.meta.env.VITE_AUTH0_CLIENT_DOMAIN;

ReactDOM.createRoot(document.getElementById("root")).render(
   <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
         redirect_uri: window.location.origin,
      }}
   >
      <Provider>
         <App />
      </Provider>
   </Auth0Provider>
);
