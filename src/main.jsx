import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./font/font.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PrimeReactProvider } from "primereact/api";
// import "primeflex/primeflex.css";
// import "primereact/resources/primereact.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
