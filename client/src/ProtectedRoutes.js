import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import SignIn from './components/SignIn';
import Nav from './components/Nav';


function ProtectedRoutes ({isLoggedIn}) {

  console.log("protected routes is logged in", isLoggedIn)

 return isLoggedIn ?
  <> 
  <Nav />
  <Outlet/>
  </> 
  : 
  <SignIn /> ;   
  
}

export default ProtectedRoutes