
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import Events from './components/Events';
import Lists from './components/Lists';
import Recipes from './components/Recipes';
import Contacts from './components/Contacts';
import Meals from './components/Meals';
import EventForm from './components/EventForm';
import Family from './components/Family';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import ProtectedRoutes from './ProtectedRoutes';


function App() {
 
 const [isLoggedIn, setIsLoggedIn] = useState(false)
 
 const logInCheck = () => {
   if (localStorage.length === 0){
    setIsLoggedIn(false);
   } else {
    setIsLoggedIn(true);
   }
 }

 useEffect(() => {
   console.log("use effect")
  logInCheck();
}, [])
 

 console.log("USER IS LOGGED IN", isLoggedIn)

  return (    
   
    <Router>    
      <div className='App'>
        
         <Routes>          
         <Route path='/' element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
         <Route path='/signup' element={<SignUp />} />
        
          <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />} >

            <Route path='/about' element={<About />} />
            <Route path='/home' element={<Home />} />
            <Route path='/family' element={<Family />} />
            <Route path='/events' element={<Events />} />
            <Route path='/eventForm' element={<EventForm />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/meals' element={<Meals />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/contacts' element={<Contacts />} />
                   

          </Route>

         </Routes>
      </div>
   
    </Router>
     
  );
}

export default App;
