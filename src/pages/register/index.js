import React, {useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import "./index.css";
import LogInLogo from "../log-in/logo.svg";
import {useNavigate} from "react-router";

// 这是注册页面，用 Ant Design 组件库里的东西改了一下
// 后续可以加很多属性，包括验证码，不过这不是我们的工作
// （指页面）
export default function RegisterPage(props) {

  const [form] = Form.useForm();

  // 记录是否发生注册错误，用于显示错误消息
  const [registerError, setRegisterError] = useState(false);

  // 记录是否正在注册，用于控制按钮显示
  const [isLoading, setIsLoading] = useState(false);

  // 使用这个 hook 来做页面跳转
  const navigate = useNavigate();

  // 发送请求到后端进行注册
  const register = (values) => {
    // 让按钮显示转圈
    setIsLoading(true);

    const {username, password, email} = values;

    fetch(
      "http://localhost:8080/user",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({userName: username, password, userEmail: email})
      }
    ).then(response => {
      // 已经得到响应
      setIsLoading(false);
      // 查看响应状态
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("register fail");
      }
    }).then(data => {
      // 带着取回的数据跳转到 home 页面
      navigate("/home", {replace: true, state: data});
    }).catch(error => {
      // 显示错误信息，按道理应该由后端返回，而不是前端硬编码
      setRegisterError(true);
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div id="register">

      <div className="top-pad" style={{height: "75px"}}/>

      <div className="register-header">
        <span className="register-logo">
            <img alt="logo" src={LogInLogo} style={{width: "100%"}}/>
          </span>
        <div className="register-title">Welcome to join us!</div>
      </div>

      <div className="register-form-container">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={register}
          scrollToFirstError
        >

          {
            registerError ?
              <Alert
                type="error"
                message="Register fail, duplicate username or invalid input!"
                closable
                onClose={() => setRegisterError(false)}
                style={{marginLeft: "200px", width: "400px"}}
              /> : ""
          }

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your usernamename!',
              }, {
                max: 20,
                message: 'No more than 20 characters!'
              }, {
                pattern: new RegExp('^[a-zA-Z0-9_]+$'),
                message: 'Can only use characters in a-z, A-Z, 0-9 and \'_\'!'
              }
            ]}
          >
            <Input style={{height: "35px"}}/>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },{
                max: 20,
                message: 'No more than 20 characters!'
              },{
                pattern: new RegExp('^[a-zA-Z0-9_]+$'),
                message: 'Can only use characters in a-z, A-Z, 0-9 and \'_\'!'
              }
            ]}
            hasFeedback
          >
            <Input.Password style={{height: "35px"}}/>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password style={{height: "35px"}}/>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input style={{height: "35px"}}/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="register-submit-button" loading={isLoading}>
              Register
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
}
