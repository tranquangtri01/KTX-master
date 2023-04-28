import React, { useEffect, useState } from "react";
import { Button, Form, Input, Divider, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { URL } from "utils/url";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const LoginForm = (props) => {
  const [checkPass, setcheckPass] = useState(true);
  const history = useHistory();

  const { loading, setIsAdmin } = props;

  const onLogin = async (values) => {
    // console.log("userName"+values.username[0]);


    if (values.username[0] === "Q") {
      try {
        const res = await axios.get(URL + "auth/login-admin", {
          params: { username: values.username, password: values.password },
        });

    console.log("nguyện keen:" + values.username[0]);


        if (res.data.length > 0) {
          window.localStorage.setItem(
            "lg",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5ceurt"
          );
          console.log("DATA", res.data);
          window.localStorage.setItem("name", res.data[0].managerName);
          window.localStorage.setItem("rl", "asibmFt");
          window.localStorage.setItem("img", res.data[0].img);
          props.setAuth(true);
          setIsAdmin(true);
          setcheckPass(true);
          setTimeout(() => {
            history.push(APP_PREFIX_PATH + "/app");
          }, 300);
        } else {
          setcheckPass(false);
        }
      } catch (err) {
        setcheckPass(false);
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get(URL + "auth/login-student", {
          params: { username: values.username, password: values.password },
        });

        if (res.data.length > 0) {
          window.localStorage.setItem(
            "lg",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5ceurt"
          );
          console.log("DATA", res.data);

          window.localStorage.setItem("name", res.data[0].name);
          window.localStorage.setItem("rl", "ibmFt");
          window.localStorage.setItem("sid", res.data[0].id);
          window.localStorage.setItem("img", res.data[0].img);
          props.setAuth(true);
          setcheckPass(true);
          setTimeout(() => {
            history.push(APP_PREFIX_PATH + "/app");
          }, 300);
        } else {
          setcheckPass(false);
        }
      } catch (err) {
        setcheckPass(false);
        console.log(err);
      }
    }
  };

  useEffect(() => {});

  console.log("setcheckPass", checkPass);
  return (
    <>
      <Alert
        type="error"
        showIcon
        message={"Bạn nhập sai tài khoản hoặc mật khẩu"}
        className={checkPass ? "invisible mb-2" : "mb-2"}
      ></Alert>

      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item name="username" label="Tài khoản">
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={
                "d-flex justify-content-between w-100 align-items-center"
              }
            >
              <span>Password</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
          <p className="mt-3 mb-0">
            Chưa có tài khoản? <a href="/auth/register-1">Đăng ký ngay</a>
          </p>
        </Form.Item>
        <div>
          <Divider>
            <span className="text-muted font-size-base font-weight-normal">
              Hoặc đăng nhập với
            </span>
          </Divider>
          <div className="d-flex justify-content-center">
            <Button
              //   onClick={() => onGoogleLogin()}
              className="mr-2"
              disabled={loading}
              icon={<CustomIcon svg={GoogleSVG} />}
            >
              Google
            </Button>
            <Button
              //   onClick={() => onFacebookLogin()}
              icon={<CustomIcon svg={FacebookSVG} />}
              disabled={loading}
            >
              Facebook
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
