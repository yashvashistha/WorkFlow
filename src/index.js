import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/responsive.css";
import "./assets/css/bootstrap-icons.css";
import "./assets/css/styles.css";
import APIContextProvider from "./helpers/APIContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <APIContextProvider>
      <App />
    </APIContextProvider>
  </React.StrictMode>
);

reportWebVitals();
