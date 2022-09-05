import React from 'react'
import style from "./style/MotivationQuote.module.css"

const MotivationQuote = (props) => {
  return (
    <div className={`quote ${style.quote}`}>
        <div className={style.text}>
          <p>{props.text}</p>
        </div>
        <div className={style.author}>
            <h3>{props.author}</h3>
        </div>
    </div>
  )
}

export default MotivationQuote