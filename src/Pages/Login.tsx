import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../styles/Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const onFinish = async (values: FieldType) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    console.log("Success:", data);
    message.success("Login successful!");
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.error("Failed:", error);
    message.error("Login failed! Plesse check your credentials.");
  }
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed", errorInfo);
  message.error("Please fill out all required fields!");
};

const Login: React.FC = () => (
  <div className="login-container">
    <Form<FieldType>
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          size="large"
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="password"
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" className="login-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default Login;
