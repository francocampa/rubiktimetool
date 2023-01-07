import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n from "./plugins/i18n";

import { app } from "./plugins/stores/app";
import { Provider as StoreProvider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider store={app}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </StoreProvider>
  </React.StrictMode>
);
