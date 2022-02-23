import React from 'react';
import '../App.css';

import Sidebar from './Sidebar';

import { useNavigate } from 'react-router-dom';

function Nav() {

  const username = localStorage.getItem("first_name");
  const navigate = useNavigate();
  
  const signOut = () => {
    localStorage.clear();
    navigate('/');
  }
   

  return (    

    <nav class="navbar navbar-expand-lg navbar-dark  static-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <h1 id='welcome-msg'>Welcome back {username}!</h1>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link " aria-current="page" href="/about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/family">My Family</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/" onClick={signOut} >Sign out</a>
            </li>
          </ul>
        </div>
      </div>
      <Sidebar/>
    </nav>
  
   
    
  )
}

export default Nav;
