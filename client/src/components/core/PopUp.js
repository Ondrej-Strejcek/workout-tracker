import React from 'react'
import style from "./style/PopUp.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



const PopUp = (props) => {
  return (
    <div className={style.background}>
        <div className={style.popup}>
            {props.children}
        </div>
        <FontAwesomeIcon className={style.fixed} icon={faXmark} onClick={props.hide}/>
    </div>
  )
}

export default PopUp