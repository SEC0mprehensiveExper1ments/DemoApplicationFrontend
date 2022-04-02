import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

// 这是 React 18 以前的写法，在浏览器的控制台会报出一个 warning
// 但是 React 18 和其它组件库有一些兼容性问题，不要用 React 18
// 的新写法
ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById("root")
);
