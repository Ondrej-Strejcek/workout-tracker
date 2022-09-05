import React from "react";
import style from "./style/Login.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const password = useRef();
  const password2 = useRef();
  const navigate = useNavigate();

  const send_button_handler = async () => {
    const data = new FormData();
    if(password.current.value != password2.current.value){
      toast("Passwords does not match")
      return;
    }
    data.append("username", username.current.value);
    data.append("password", password.current.value);
    data.append("password2", password2.current.value);
    try {
      const res = await axios.post("/api/auth/register", data);
      toast("Registered successfully")
      navigate("/auth/login");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  return (
    <div className={style.login}>
      <div className={style.blur}>
        <div className="form">
          <h2>Register</h2>
          <div>
            <label htmlFor="username">Username</label>
            <input ref={username} type="text" name="username" id="username" />
          </div>

          <div>
            <label htmlFor="pw">Password</label>
            <input ref={password} type="password" name="pw" id="pw" />
          </div>

          <div>
            <label htmlFor="pw2">Password again</label>
            <input ref={password2} type="password" name="pw2" id="pw2" />
          </div>

          <button onClick={send_button_handler} className="btn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
