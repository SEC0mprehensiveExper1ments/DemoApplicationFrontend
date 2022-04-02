import {Form, Input, Button, Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./index.css";
import {Link} from "react-router-dom";
import LogInLogo from "./logo.svg";
import {useState} from "react";
import {useNavigate} from "react-router";

// 这是登录页面
// 从 Ant Design Pro 的仓库里复制过来简化了一下
export default function LogInPage(props) {

  // 记录是否有登录错误
  const [loginFail, setLoginFail] = useState(false);

  // 记录是否正在登录
  const [isLoading, setIsLoading] = useState(false);

  // 使用这个 hook 来做页面跳转
  const navigate = useNavigate();

  // 发送请求到后端登录
  const login = (values) => {
    // 让按钮转圈，服务器比较慢
    setIsLoading(true);

    const {username, password} = values;

    fetch(
      "http://localhost:8080/session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `userName=${username}&password=${password}`
      }
    ).then(response => {
      setIsLoading(false);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("login fail");
      }
    }).then(data => {
      navigate("/home", {replace: true, state: data});
    }).catch(error => {
      // 显示错误信息
      setLoginFail(true);
    });
  }

  // 返回要渲染的 html，样式是 cv + 微调
  return (
    <div id="log-in">
      <div className="top-pad"/>

      <div className="login-container">

        <div className="login-header">
          <span className="login-logo">
            <img alt="logo" src={LogInLogo} style={{width: "100%"}}/>
          </span>
          <span className="login-title">Ant Design</span>
        </div>

        <div className="login-desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>

        {/*条件渲染，如果登录失败显示此错误信息*/}
        {
          loginFail ?
            <Alert
              message="Wrong username or password!"
              type="error"
              closable
              onClose={() => setLoginFail(false)}
            /> : ""
        }

        {/*填写用户名密码的表单*/}
        <Form name="normal_login" className="login-form" onFinish={login}>

          {/*前端的简单校验，一般来讲后端服务层也需要加校验*/}
          <Form.Item name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },{
                max: 20,
                message: 'No more than 20 characters!'
              },{
                pattern: new RegExp('^[a-zA-Z0-9_]+$'),
                message: 'Can only use characters in a-z, A-Z, 0-9 and \'_\'!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="login-username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },{
                max: 20,
                message: 'No more than 20 characters!'
              },{
                pattern: new RegExp('^[a-zA-Z0-9_]+$'),
                message: 'Can only use characters in a-z, A-Z, 0-9 and \'_\'!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="login-password"
            />
          </Form.Item>

          <Form.Item>
            <Link className="login-form-register" to="/register">
              Register
            </Link>
          </Form.Item>

          {/*点这个按钮就会调用 login 函数*/}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
