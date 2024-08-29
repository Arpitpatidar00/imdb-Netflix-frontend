import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./components/contex/DataContext.js"; // Adjust import path as needed
import store from './store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-tailwind/react";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <DataProvider>
    <ThemeProvider>
      <App />
      </ThemeProvider>
    </DataProvider>
    </Provider>
  </React.StrictMode>
);
