import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {

  const username = localStorage.getItem("first_name");

  console.log(username)

  return (    

    <nav className='top_nav'>     

    <h1>Welcome Back {username} !</h1>
      <ul className='nav-links'>        
        <li ><a href="/signup">Sign up</a></li>
      </ul>       
    </nav>     
  );
}

export default Nav;
