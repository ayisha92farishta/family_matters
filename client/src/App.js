
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
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';
import Meals from './components/Meals';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState, useEffect} from 'react';


function App() {
 
 const [isLoggedIn, setIsLoggedIn] = useState('')
 
 const logInCheck = () => {
   if (localStorage.length === 0){
    setIsLoggedIn(false);
   } else {
    setIsLoggedIn(true);
   }
 }

 useEffect(() => {
  logInCheck();
}, [])
 

 console.log("USER IS LOGGED IN", isLoggedIn)

  return (    
   
    <Router>    
      <div className='App'>
         { isLoggedIn ? <Nav /> : <SignIn/>  } 
         <Routes>
         <Route path='/about' element={<About />} />
         <Route path='/home' element={<Home />} />
         <Route path='/events' element={<Events />} />
         <Route path='/lists' element={<Lists />} />
         <Route path='/meals' element={<Meals />} />
         <Route path='/recipes' element={<Recipes />} />
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
