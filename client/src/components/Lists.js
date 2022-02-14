import React, { useEffect } from 'react';
import ListsInput from './Lists/Lists_input';
import ListItems from './Lists/ListItems';
import ListsNames from './Lists/ListsNames';
import '../App.css';

function Lists() {

 

  return (
  
  <>
  <div className='list-container  my-5'>
    <div>
    <ListsNames />
      
    </div>
    <div className='new-list'> 
      <ListsInput />
      <ListItems />
     
    </div>
    
    
  </div>
  
  </>
    
  );
}

export default Lists;
