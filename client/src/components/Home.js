import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Nav from './Nav';

function Home() {
  return (    
    
    <div id='home-container' class="bgimg" > 
    
    <div className='home-icons' id="row1">
        <Link to='/events'> 
          <h5>Events</h5>
          <img
          src="icons/events.png"
          />
        </Link>
        <Link to='/lists'> 
        <h5>Lists</h5>
          <img
          src="icons/list.png"
          />
        </Link>
        
        <Link to='/contacts'> 
          <h5>Contacts</h5>
          <img
          src="icons/contact.png"
          />
        </Link>
        {/* <Link to='/meals'> 
          <h5>Meal Planner</h5>
          <img
          src="icons/meal.png"
          />
        </Link>
        <Link to='/recipes'> 
          <h5>Recipes</h5>
          <img
          src="icons/recipe.png"
          />
        </Link> */}
          
    </div>
    
    {/* <div className='home-icons'>
        <Link to='/contacts'> 
          <h5>Contacts</h5>
          <img
          src="icons/contact.png"
          // src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          />
        </Link>
                  
    </div> */}
    <br></br>
    <div className='home-icons' id="row2">
        <Link to='/meals'> 
          <h5>Meal Planner</h5>
          <img
          src="icons/meal.png"
          />
        </Link>
        <Link to='/recipes'> 
          <h5>Recipes</h5>
          <img
          src="icons/recipe.png"
          />
        </Link>
          
    </div>
    </div>
  );
}

export default Home;
