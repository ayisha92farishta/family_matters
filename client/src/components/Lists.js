import React, {useState} from 'react';
import List_form from './List_form'
import ListTodo from './ListTodo';
import '../App.css';

function Lists() {
  const [inputText, setInputText] = useState("");
  return (   
    <div className='App'>
      <header>
         <h1>Family Lists</h1>
      </header>     
      < List_form /> 
      < ListTodo />
    </div> 
    
  );
}

export default Lists;
