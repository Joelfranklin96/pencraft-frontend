import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserType } from "../assets/types";
import { API_BASE_URL } from "../config/api";


export type UserContextType = {
    fetchUser: () => Promise<void>,
    user: UserType | null,
    userType: string,
    isUserLoaded: boolean,
    setToken: (token: string | null) => void
    setIsUserLoaded: (isUserLoaded: boolean) => void
    setUserType: (userType: string) => void
}

const UserContext = createContext<UserContextType|null>(null);

export const UserProvider = ({ children } : {children: ReactNode}) => {
    const [userType, setUserType] = useState("guest");
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const fetchUser = async() => {

        const storedToken = localStorage.getItem('token');
        if(!storedToken){
            setUserType('guest');
            setUser(null);
            setIsUserLoaded(true);
            return
        }
        try{
            setIsUserLoaded(false);
            setToken(storedToken);
            const response = await axios.get(`${API_BASE_URL}/api/v1/user/me`, 
                {
                    headers:{
                        'Authorization': `Bearer ${storedToken}`
                    }
                }
            );
            setUser(response.data.user);
            setUserType(response.data.user.userType)
            setIsUserLoaded(true);
        }
        catch(error){
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setUserType('guest');
            setIsUserLoaded(true);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [token]);

    const value = {fetchUser, user, userType, isUserLoaded, setToken, setIsUserLoaded, setUserType};

    return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUserContext must be used within UserProvider');
    }
    return context
}


