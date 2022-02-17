import React, { useEffect, useState } from 'react';
import ListsItemInput from './Lists/ListItemInput';
import ListItems from './Lists/ListItems';
import ListsNames from './Lists/ListsNames';
import ListNew from './Lists/ListNew';
// import ListEdit from './Lists/ListEdit';
import './Lists.css';


function Lists() {
 
  return (
  
  <>
  <div className='list-container  my-5'>
    <div>
      
    <ListNew />
    <ListsNames />
      
    </div>
    <div className='new-list'> 
      <ListsItemInput />
      <ListItems />
     
    </div>
    
    
  </div>
  
  </>
    
  );
}

export default Lists;
