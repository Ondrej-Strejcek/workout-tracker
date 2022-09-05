import React from "react";
import { Link } from "react-router-dom";
import Motivation from "../../components/core/Motivation";
import style from "./style/Home.module.css";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const Home = () => {
  const blur = useRef();

  useEffect(() => {
    gsap.from(blur.current, {x:50,opacity: 0, duration: 0.5})
  },[]);

  return (
    <div>
      <div className={style.home}>
        <div>
          <div ref={blur} className={style.blur}>
            <h1>Workout tracker</h1>
            <p>
              This app allows you to track your progress easily.
            </p>
            <Link to="/auth/login" className="btn">
              Login
            </Link>
          </div>
        </div>
      </div>
      <Motivation />
    </div>
  );
};

export default Home;
