import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./mediaQuery.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { QueryClient, QueryClientProvider } from "react-query";


const root = ReactDOM.createRoot(document.getElementById("root"));
//Provide all project with query
let queryClient = new QueryClient();

root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
