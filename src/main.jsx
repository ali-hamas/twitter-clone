import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./fonts/fonts.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { TweetProvider } from "./contexts/TweetContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TweetProvider>
        <App />
      </TweetProvider>
    </AuthProvider>
  </React.StrictMode>,
);
