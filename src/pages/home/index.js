import React from 'react';
import {useLocation} from "react-router";
import {Descriptions} from "antd";
import "antd/dist/antd.min.css";
import {Link} from "react-router-dom";

export default function HomePage(props) {
  // 和 useNavigate 差不多，其实后面是由 React 提供的全局数据管理
  // 调用 useLocation() 就会得到某些数据
  const location = useLocation();

  // 取出从别的页面带来的数据
  const {userId, userName, password, userEmail} = location.state;

  // 描述列表每一项的 style
  const itemStype = {
    fontSize: "20px"
  };

  // 简单点
  return (
    <div style={{textAlign: "center", width: "800px", margin: "0 auto"}}>
      <div style={{height: "120px"}}/>
      <span style={{fontSize: "40px", display: "inline-block", marginBottom: "40px"}}>{userName}'s HomePage</span>
      <Descriptions bordered>
        <Descriptions.Item label="userId" style={itemStype}>{userId}</Descriptions.Item>
        <Descriptions.Item label="userName" style={itemStype}>{userName}</Descriptions.Item>
        <Descriptions.Item label="password" style={itemStype}>{password}</Descriptions.Item>
        <Descriptions.Item label="userEmail" style={itemStype}>{userEmail}</Descriptions.Item>
      </Descriptions>
      <Link to="/login" style={{display: "inline-block", fontSize: "16px", marginTop: "60px"}}>Log Out</Link>
    </div>
  );
}
