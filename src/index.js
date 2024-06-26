import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import App from "./App";
import { Provider } from 'react-redux';
import {store} from './store/index';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
  </Provider>
    </BrowserRouter>
  </React.StrictMode >
);
