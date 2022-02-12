import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (    
    <> 
    <h1>Welcome Home</h1> 
    <div className='home-icons'>
        <Link to='/lists'> 
          <img
          src="icons/lists.png"
          />
        </Link>
        <Link to='/events'> 
          <img
          src="icons/events.png"
          />
        </Link>
          
    </div>
    
    <div className='home-icons'>
        <Link to='/contacts'> 
          <img
          src="icons/contact.png"
          />
        </Link>
                  
    </div>
    <div className='home-icons'>
        <Link to='/meals'> 
          <img
          src="icons/meal.png"
          />
        </Link>
        <Link to='/recipes'> 
          <img
          src="icons/recipe.png"
          />
        </Link>
          
    </div>
    </>
  );
}

export default Home;
