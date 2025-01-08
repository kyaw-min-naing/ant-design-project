import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../styles/Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (values: FieldType) => {
    setLoading(true);

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
      login();
      console.log("Success:", data);
      message.success("Login successful!");
      navigate("/products");
    } catch (error) {
      console.error("Failed:", error);
      message.error("Login failed! Plesse check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // const onFinishFailed = (errorInfo: unknown) => {
  //   console.log("Failed", errorInfo);
  //   message.error("Please fill out all required fields!");
  // };

  return (
    <div className="login-container">
      <Form<FieldType>
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
