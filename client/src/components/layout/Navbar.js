import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useUser } from "../../AuthContext";

const Navbar = () => {
  const navbar = useRef();
  const user = useUser();

  useEffect(() => {
    gsap.from(navbar.current, { opacity: 0, duration: 0.3 });
  }, []);

  const burger_handler = () => {
    const burger = document.getElementsByClassName(style.burger)[0];
    const nav_content = document.getElementById("nav_content");
    if (!burger.classList.contains(style.cross)) {
      nav_content.classList.add(style.side_nav);
      burger.classList.add(style.cross);
    } else {
      nav_content.classList.remove(style.side_nav);
      burger.classList.remove(style.cross);
      hide();
    }
  };

  const hide = () => {
    const nav_content = document.getElementById("nav_content");
    const burger = document.getElementsByClassName(style.burger)[0];
    if (nav_content.classList.contains(style.side_nav)) {
      nav_content.classList.remove(style.side_nav);
      burger.classList.remove(style.cross);
    }
  };

  return (
    <nav ref={navbar}>
      <div className={style.nav_container}>
        <h1>Workout Tracker</h1>
        <div onClick={burger_handler} id="burger" className={style.burger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul id="nav_content" onClick={hide}>
          <li>
            <Link to="/">Motivation</Link>
          </li>
          <li>
            <Link to="/workouts">Track my Workout</Link>
          </li>
          {user.isAuthenticated ? (
            <li>
              <Link to="/auth/logout">Logout</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
