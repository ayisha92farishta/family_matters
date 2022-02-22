import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListItems from './Lists/ListItems';
import ListNew from './Lists/ListNew';
import ListEdit from './Lists/ListEdit';
import Nav from './Nav';
// import ListEdit from './Lists/ListEdit';
import './Lists.css';



function Lists() {

  const [lists, setLists] = useState([]);

    //getting account and userid from local storage
    const userId = localStorage.getItem('user_id');
    const accountId = localStorage.getItem('account_id');


    //function to delete a list
    const deleteListName = (id) => {
    const deleteList = axios.delete(`/api/lists/${id}`)
    setLists(lists.filter(list => list.id !== id))    
    }

    // function to get list names
    const getListNames = () => {
      axios.get(`/api/lists/?userId=${userId}&accountId=${accountId}`)
      .then(res => {
        const listNameArray = res.data.lists;
        //console.log(listNameArray);
        setLists(listNameArray)
      });    
    };

    useEffect(() => {
      getListNames();
    }, [])
 //console.log("LIne 38 lists.js")
 
  return (
  
  <>
 
  <div className='list-container  p-3 mb-5 rounded'>
    
    <div >      

      <ListNew />
 
    <h1>Lists that already exists</h1>
      <table className="table list-table   my-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>          
         {lists.map(list => (
            <tr key={list.id}>
            <td>{list.name}</td>
            <td>
              <ListEdit 
              list={list}
               />
            </td>
            <td>
              <button 
              className='btn btn-danger'
              onClick={() => {deleteListName(list.id)}}
              >Delete</button>
            </td>
          </tr>
          )) 
         }

        </tbody>
      </table>

    </div>
    <div className='list-items'>       
      <ListItems 
      lists={lists}
      />     
    </div>
  
 
    
  </div>

  
  
  </>
    
  );
}

export default Lists;
