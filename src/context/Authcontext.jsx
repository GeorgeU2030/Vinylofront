import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => { 
  const [user,setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  },[])
  
  const loginContext = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem('user');
  }
  
  return (
    <AuthContext.Provider value={{user, loginContext, logoutContext, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}