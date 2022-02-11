
import './App.css';
import SignInSide from './components/SignInSide';
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import Events from './components/Events';
import To_do from './components/To_do';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (    
    <Router> 
   
      <div className='App'>
         <Nav />
         <Routes>
         <Route path='/about' element={<About />} />
         <Route path='/home' element={<Home />} />
         <Route path='/events' element={<Events />} />
         <Route path='/to_do' element={<To_do />} />
         </Routes>
      </div>
        
    </Router>
     
  );
}

export default App;
