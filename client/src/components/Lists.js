import React, { useEffect, useState } from 'react';
import ListsInput from './Lists/Lists_input';
import ListItems from './Lists/ListItems';
import ListsNames from './Lists/ListsNames';
import ListNew from './Lists/ListNew';
import '../App.css';

function Lists() {
 
  return (
  
  <>
  <div className='list-container  my-5'>
    <div>
      
    <ListNew />
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
