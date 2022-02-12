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
          <img
        src="icons/meal.png"
        />
          
    </div>
    
    <div className='home-icons'>

          <img
        src="icons/recipe.png"
        />
          <img
        src="icons/contact.png"
        />
        </div>
    </>
  );
}

export default Home;
