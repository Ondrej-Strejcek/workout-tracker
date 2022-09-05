import React from "react";
import style from "./style/Stats.module.css";
import {useRef, useEffect} from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Stats = () => {
  const stats = useRef();
  const information = gsap.utils.selector(stats);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    console.log(information(".information"))
    gsap.fromTo(
      information(information(".information")),
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: information(information(".informatio")),
          start: "top bottom",
        },
        duration: 0.5,
        stagger: 0.15,
      }
    );
  },[])

  return (
    <div className={style.stats}>
      <div className="container">
        <h1>My Stats</h1>
        <div ref={stats} className={style.flex}>
          <div className={`${style.information} information`}>
            <h2>Will be available</h2>
            <h1>Soon</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
