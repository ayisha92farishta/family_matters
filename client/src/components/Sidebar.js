import React from 'react';
import '../App.css';

function Sidebar() {
  return (
    <header class="header" role="banner">
  <h1 class="logo">
    <a href="#">Family <span>Matters</span></a>
  </h1>
  <div class="nav-wrap">
    <nav class="main-nav" role="navigation">
      <ul class="unstyled list-hover-slide">
        <li><a href="/about">About</a></li>
        <li><a href="/home">Home</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/lists">Lists</a></li>
        <li><a href="/recipe">Recipe</a></li>
        <li><a href="/contacts">Contacts</a></li>
        <li><a href="/signup">Add a member</a></li>      
      </ul>
    </nav>
    {/* <ul class="social-links list-inline unstyled list-hover-slide">
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Google+</a></li>
      <li><a href="#">GitHub</a></li>
      <li><a href="#">CodePen</a></li>
    </ul> */}
  </div>
</header>
  )
}

export default Sidebar