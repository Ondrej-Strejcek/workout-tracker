import {Routes, Route} from "react-router-dom";
import {Register, Login, Logout } from "./views/auth/AuthRoutes";
import {Stats, Home, Workouts, Workout} from "./views/core/CoreRoutes";
import Navbar from "./components/layout/Navbar";
import AuthOnly from "./components/auth/AuthOnly";
import NotAuthenticated from "./components/auth/NotAuthenticated";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import axios from "axios";
import {useUserUpdate} from "./AuthContext";

function App() {
  const updateUser = useUserUpdate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .post("/api/auth/check-token")
        .then((res) => {
          console.log(res);
          updateUser({
            isAuthenticated: res.data.authenticated,
          });
        })
        .catch((err) => {
          if (err.response.status == 401) {
            localStorage.removeItem("token");
            axios.defaults.headers["auth-token"] = null;
            updateUser({
              isAuthenticated: false,
            });
          }
        });
    } else {
      updateUser({
        isAuthenticated: false,
      });
    }
  }, []);

  return (
    <>
    <Navbar />
    <ToastContainer hideProgressBar={true} />
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="workouts" >
          <Route index element={<AuthOnly><Workouts /></AuthOnly>}/>
          <Route path="stats" element={<AuthOnly><Stats /></AuthOnly>}/>
          <Route path=":id" element={<AuthOnly><Workout /></AuthOnly>}/>
        </Route>
        <Route path="auth" >
          <Route path="register" element={<NotAuthenticated><Register /></NotAuthenticated>}/>
          <Route path="login" element={<NotAuthenticated><Login /></NotAuthenticated>}/>
          <Route path="logout" element={<AuthOnly><Logout /></AuthOnly>}/>
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
