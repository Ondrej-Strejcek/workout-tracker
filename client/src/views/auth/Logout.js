import React from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { useUserUpdate } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const updateUser = useUserUpdate();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        axios.defaults.headers["auth-token"] = null;
        updateUser({
            isAuthenticated: false,
        });
        navigate("/");
      }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout