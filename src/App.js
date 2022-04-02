import React from 'react';
import {Routes, Route} from "react-router-dom";

import LogInPage from "./pages/log-in";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";

export default function App(props) {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element=<LogInPage/>/>
        <Route exact path="/register" element=<RegisterPage/>/>
        <Route exact path="/home" element=<HomePage/>/>
        <Route path="*" element=<NotFoundPage/>/>
      </Routes>
    </div>
  );
}
