import React from "react";
import { useContext, useState } from "react";

const UserContext = React.createContext();
export const UserUpdateContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function useUserUpdate(){
    return useContext(UserUpdateContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState({
        isAuthenticated: false,
    })

    return(
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}