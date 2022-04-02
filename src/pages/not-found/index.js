import React from 'react';

import "./index.css";
import Background from "./background.jpg";
import {Button} from "antd";
import "antd/dist/antd.min.css";
import {Link} from "react-router-dom";

export default function NotFoundPage(props) {
  return (
    <div id="not-found">
      <img src={Background} alt="404 Not Found"/>
      <div style={{fontSize: "16px"}}>
        <Link to="/login"><Button type="link" size="large" loading={false}>Log In</Button></Link> or
        <Link to="/register"><Button type="link" size="large">Register</Button></Link>
      </div>
    </div>
  );
}
