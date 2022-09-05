import React from 'react'
import style from "./style/Loading.module.css"

const Loading = () => {
  return (
    <div className={style.flex}>
      <div className={style.loader}></div>
    </div>
  )
}

export default Loading