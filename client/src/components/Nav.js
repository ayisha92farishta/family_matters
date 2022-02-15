import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {

  const username = localStorage.getItem("first_name");

  console.log(username)

  return (    

    <nav className='top_nav'>     

    <h3>Welcome Back {username} !</h3>
      <ul className='nav-links'>  
        <li ><a href="/signup">Family members</a></li>
        <li ><a href="/signup">Add a member</a></li>
        <li ><a href="/signup">Sign out</a></li>
      </ul>       
    </nav>     
  );
}

export default Nav;
