import React, { useEffect } from 'react';
import ListsInput from './Lists/Lists_input';
import ListTodos from './Lists/List_todos';
import '../App.css';

function Lists() {

  // const useEffect () => {

  // }

  return (
  
  <>
  <div className='list-container  my-5'>
    <div>
      <h1>Lists that already exists</h1>
    </div>
    <div className='new-list'> 
      <ListsInput />
      <ListTodos />
    </div>
    
    
  </div>
  
  </>
    
  );
}

export default Lists;
