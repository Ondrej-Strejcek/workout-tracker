import React from "react";
import style from "./style/Login.module.css";
import axios from "axios"
import { useRef } from "react";
import { useUserUpdate } from "../../AuthContext";
import {toast} from "react-toastify"
import { Link } from "react-router-dom";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const updateUser = useUserUpdate();


  const send_button_handler = async () => {
    const data = new FormData();
    data.append("username", username.current.value);
    data.append("password", password.current.value);
    try {
      const res = await axios.post("/api/login", data);
      if (!res.data.successful == "true") {
        toast("Wrong email or password");
      } else {
        const token = `Bearer ${res.data.access_token}`;
        updateUser({isAuthenticated: true});
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
      }
    } catch (error) {
      toast("Wrong email or password");
    }
  };

  const test_button_handler = async () => {
    const data = new FormData();
    data.append("username", "testusername");
    data.append("password", "testuserpassword");
    try {
      const res = await axios.post("/api/login", data);
      if (!res.data.successful == "true") {
        toast("Wrong email or password");
      } else {
        const token = `Bearer ${res.data.access_token}`;
        updateUser({isAuthenticated: true});
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
      }
    } catch (error) {
      toast("Wrong email or password");
    }
  };

  return (
    <div className={style.login}>
      <div className={style.blur}>
        <div className="form">
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username</label>
            <input ref={username} type="text" name="username" id="username" />
          </div>

          <div>
            <label htmlFor="pw">Password</label>
            <input ref={password} type="password" name="pw" id="pw" />
          </div>
          <p>Don't have an account? <Link to="/auth/register">Register</Link></p>

          <button onClick={send_button_handler} className="btn">Login</button>
          <button onClick={test_button_handler} className="btn">Test User</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
