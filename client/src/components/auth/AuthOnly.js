import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUser } from '../../AuthContext';

const AuthOnly = (props) => {
    const user = useUser();
    if(!user.isAuthenticated){
        return(<Navigate to="/auth/login" replace={true}/>)
    }
  return (
    <>{props.children}</>
  )
}

export default AuthOnly