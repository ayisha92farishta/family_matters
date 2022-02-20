import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Nav() {

  const username = localStorage.getItem("first_name");
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    navigate('/');
  }
  return (    

    <nav className='top_nav'>     

    <h3>Welcome Back {username} !</h3>
      <ul className='nav-links'>  
        <li ><a href="/signup">Family members</a></li>
        <li ><a href="/newMember">Add a member</a></li>
        <li ><a href="/" onClick={signOut}>Sign out</a></li>
      </ul>       
    </nav>     
  );
}

export default Nav;
