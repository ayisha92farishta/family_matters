import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (    
    <nav className='top_nav'>  

      <ul className='nav-links'>
       
        <Link to='/'>
          <li>Sign in</li>
        </Link>
        <Link to='/signup'>
          <li>Signout</li>
        </Link>
      </ul> 
      
    </nav>     
  );
}

export default Nav;
