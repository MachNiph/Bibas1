import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { auth } from "../firebase-config";
import { database } from "../firebase-config";

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
} from "antd";
// import Password from "antd/es/input/Password";

const { Option } = Select;

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
const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="977">+977</Option>
        <Option value="01">+01</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    console.log("received value:", values);
  };

  const reg = async () => {
    try {
      const { username, email, phone, gender, password } =
        form.getFieldsValue();

      //register
      const user = await createUserWithEmailAndPassword(auth, email, password);

      const userdetail = user.user;

      await updateProfile(userdetail, {
        displayName: username,
      });

      const userInfoDB = ref(database, `users/${userdetail.uid}`);
      await set(userInfoDB, {
        username: username,
        email: email,
        phone: phone,
        gender: gender,
      });
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const PasswordStrengthChecker = ({ password }) => {
    console.log("PasswordStrengthChecker received password:", password);
    if (!password) {
      return null;
    }
    const calculatePasswordStrength = (password) => {
      const minLength = 6;
      const maxLength = 12;

      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
        password
      );
      const lengthStrength =
        (password.length - minLength) / (maxLength - minLength);

      const strength =
        (hasUppercase + hasLowercase + hasNumber + hasSpecialCharacter) / 4;

      return Math.min(1, strength * lengthStrength);
    };

    const passwordStrengthPercent = calculatePasswordStrength(password) * 100;
    const passwordStrengthStatus =
      passwordStrengthPercent >= 75
        ? "success"
        : passwordStrengthPercent >= 50
        ? "normal"
        : "exception";

    return (
      <Progress
        percent={passwordStrengthPercent}
        status={passwordStrengthStatus}
        showInfo={false}
      />
    );
  };

  return (
    <div className="register">
      <div className="register-left"></div>
      <div className="register-right">
        <h1> Register Its Free</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email..",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^[0-9]+$/,

                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input
              maxLength={10}
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
            hasFeedback
          >
            <Input.Password onChange={(e) => e.target.value} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="password-strength-checker">
            <Form.Item className="show-strength">
              <PasswordStrengthChecker
                password={form.getFieldValue("password")}
              />
            </Form.Item>
          </div>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={reg}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
