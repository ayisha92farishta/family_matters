
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import Events from './components/Events';
import Lists from './components/Lists';
import Sidebar from './components/Sidebar';
import Recipes from './components/Recipes';
import NewRecipe from './components/NewRecipe';
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';
import Meals from './components/Meals';
import EventForm from './components/EventForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState, useEffect} from 'react';


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
  logInCheck();
}, [isLoggedIn])
 

 console.log("USER IS LOGGED IN", isLoggedIn)

  return (    
   
    <Router>    
      <div className='App'>
         { isLoggedIn ? <Nav /> : <SignIn/>  } 
         <Routes>
         <Route path='/about' element={<About />} />
         <Route path='/home' element={<Home />} />
         <Route path='/events' element={<Events />} />
         <Route path='/eventForm' element={<EventForm />} />
         <Route path='/lists' element={<Lists />} />
         <Route path='/meals' element={<Meals />} />
         <Route path='/recipes' element={<Recipes />} />
         <Route path='/newRecipe' element={<NewRecipe />} />
         <Route path='/contacts' element={<Contacts />} />
         <Route path='/contactsForm' element={<ContactsForm />} />
         <Route path='/' element={<SignIn />} />
         <Route path='/signup' element={<SignUp />} />
         </Routes>
      </div>
   
    </Router>
     
  );
}

export default App;
