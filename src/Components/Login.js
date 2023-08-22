import React, { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import logindesign from "./logindesign";
import Home from "./Home";
import { UserContext } from "../contexts/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  if (user) {
    navigate("/home");
    return;
  }
  const onFinish = (values) => {
    localStorage.setItem("user", JSON.stringify(values));
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUser(user);
      navigate("/Home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    prevArrow: null,
    nextArrow: null,
    dots: true,
    infinite: true,
    fade: true,
    cssEase: "linear",
    adaptiveHeight: true,
    draggable: true,
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            width: "100wh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader />
        </div>
      ) : (
        <div className="login">
          <div className="login-left">
            <h1> WORSHIP </h1>

            <Slider {...sliderSettings}>
              <img src="image/loginphoto1.jpg" alt="" />
              <img src="image/loginphoto2.jpeg" alt="" />
              <img src="image/loginphoto3.jpg" alt="" />
            </Slider>
          </div>

          <div className="login-right">
            <h1> Login To Your Account</h1>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  onClick={login}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
