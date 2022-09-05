import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUser } from '../../AuthContext'

const NotAuthenticated = (props) => {
    const user = useUser();
    if(user.isAuthenticated){
        return(<Navigate to="/workouts" replace={true}/>)
    }
  return (
    <>{props.children}</>
  )
}

export default NotAuthenticated 