import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import App from "./App";

// ignore sourcemap uploading for now

Sentry.init({
  dsn: "http://f66434898360462a9a978e9f2d76c3b2@localhost:9191/2",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
