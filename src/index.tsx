import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { registerLicense } from "@syncfusion/ej2-base";
import { AuthProvider } from "react-oidc-context";

import { L10n, setCulture } from "@syncfusion/ej2-base";
import vi from "@syncfusion/ej2-locale/src/vi.json";
import { authConfig } from "./authConfig";
import { MantineProvider } from "@mantine/core";

L10n.load(vi);
setCulture("vi");

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFac1pJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBiWn9acXBQRGBbWUY="
);

const root = ReactDOM.createRoot(document.getElementById("root")!);
// appReady.then(() => {
  root.render(
    <>
      <AuthProvider {...authConfig}>
        <MantineProvider
          theme={{
            // fontFamily: "Source Sans Pro",
            fontSizes: { md: 14 },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <App />
        </MantineProvider>
      </AuthProvider>
    </>
  );
// })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
