import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { user } from 'pg/lib/defaults';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Nav() {

  const username = localStorage.getItem("first_name");
  const navigate = useNavigate();
  
  const signOut = () => {
    localStorage.clear();
    navigate('/');
  }
   

  return (    

    <nav className='top_nav' >     
      
    <h1>Welcome back {username}!</h1>
      <ul className='nav-links'>  
        <li ><a href="/family">Family members</a></li>
        <li ><a href="/signup">Add a member</a></li>
        <li ><a href="/" onClick={signOut}>Sign out</a></li>
      </ul>       
      <Sidebar/> 
    </nav>    
    
  );
}

export default Nav;
