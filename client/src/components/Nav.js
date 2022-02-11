import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (    
    <nav>  
      <h1>Family matters</h1>
      <ul className='nav-links'>
        <Link to='/about'>
          <li>About</li>
        </Link>
        <Link to='/home'>
          <li>Home</li>
        </Link>
        <Link to='/events'>
          <li>Events</li>
        </Link>
        <Link to='/to_do'>
          <li>To do Lists</li>
        </Link>
      </ul> 
      
    </nav>     
  );
}

export default Nav;
