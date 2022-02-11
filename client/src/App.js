
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import Events from './components/Events';
import Lists from './components/Lists';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (    
    // <div>
    //   <Sidebar />
    // </div>
    <Router>    
      <div className='App'>
         <Nav />
         <Sidebar />
         <Routes>
         <Route path='/about' element={<About />} />
         <Route path='/home' element={<Home />} />
         <Route path='/events' element={<Events />} />
         <Route path='/lists' element={<Lists />} />
         <Route path='/' element={<SignIn />} />
         <Route path='/signup' element={<SignUp />} />
         </Routes>
      </div>

        
    </Router>
     
  );
}

export default App;
