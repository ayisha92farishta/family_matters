import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ListEdit from './ListEdit';

function ListsNames() {
  const [listNames, setListNames] = useState([])

//getting account and userid from local storage
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');

  // console.log('userid------>', userId, 'Account id', accountId)

//function to delete a list
  const deleteList = (id) => {
   const deleteListName = axios.delete(`/api/lists/${id}`)
   setListNames(listNames.filter(list => list.id !== id))    
  }

// function to get list names
  const getListNames = () => {
    axios.get(`/api/lists/?userId=${userId}&accountId=${accountId}`)
    .then(res => {
      const listNameArray = res.data.lists;
      //console.log(listNameArray);
      setListNames(listNameArray)
    });    
  };

  useEffect(() => {
    getListNames();
  }, [])
  
//console.log("List names----------------------",listNames);
  return (
    
    <>
    <h1>Lists that already exists</h1>
      <table className="table  my-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>          
         {listNames.map(list => (
            <tr key={list.id}>
            <td>{list.name}</td>
            <td>
              <ListEdit />
            </td>
            <td>
              <button 
              className='btn btn-danger'
              onClick={() => deleteList(list.id)}
              >Delete</button>
            </td>
          </tr>
          )) 
         }

        </tbody>
      </table>
    </>
  )
}

export default ListsNames