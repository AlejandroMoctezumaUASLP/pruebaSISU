import React from 'react';
// USAR CON REACT 17
import ReactDOM from 'react-dom';
// USAR SOLO CUANDO SE ACTUALICÉ A REACT 18
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

// USAR CON REACT 17
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// USAR EN CASO QUE SE ACTUALICE A REACT 18
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//  <React.StrictMode>
//    <BrowserRouter>
//      <App />
//    </BrowserRouter>,
//  </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
