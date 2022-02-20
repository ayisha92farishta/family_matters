import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import SignIn from './components/SignIn';





function ProtectedRoutes () {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
 
  const logInCheck = () => {
    if (localStorage.length === 0){
     setIsLoggedIn(false);
    } else {
     setIsLoggedIn(true);
    }
  }
 
  useEffect(() => {
   logInCheck();
 }, [isLoggedIn])

 //console.log("USER IS LOGGED IN", isLoggedIn)

  return isLoggedIn ? <Outlet/> : <SignIn /> ;   
  
}

export default ProtectedRoutes