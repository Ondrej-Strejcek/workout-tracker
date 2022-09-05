import React from "react";
import MotivationQuote from "./MotivationQuote";
import Loading from "./Loading";
import style from "./style/Motivation.module.css";
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react"; 
import axios from "axios"

const Motivation = () => {
  const quotes = useRef();
  const quote = gsap.utils.selector(quotes);
  const [quotesArray, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      quote(".quote"),
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: quote(".quote"),
          start: "top bottom",
        },
        duration: 0.5,
        stagger: 0.15,
      }
    );
    fetch_quotes();
  },[])

  const fetch_quotes = () => {
    console.log("test")
   axios 
    .get("/api/motivation")
    .then(res => {
      for(let i = 0; i < 3; i++){
        let min = Math.ceil(0);
        let max = Math.floor(res.data.length);
        let random =  Math.floor(Math.random() * (max - min + 1)) + min;
        setQuotes(current => [...current, res.data[random]])
        res.data.splice(random, 1)
      }
      setLoading(false)
    })
    .catch(err => console.error(err))
  }

  return (
    <div className={style.page}>
      <div className="container">
        <h1>Daily motivation</h1>
        <p>Enjoy some quotes fetched from FitnessQuotes API</p>
        <div ref={quotes} className={style.flex}>
          {loading ? <Loading /> : (
            quotesArray.map(quote =>(
              <MotivationQuote text={quote.quote} author={quote.author} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Motivation;
