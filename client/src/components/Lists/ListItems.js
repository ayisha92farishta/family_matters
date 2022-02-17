import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ListsItemInput from './ListItemInput';

function ListItems(props) {
  console.log("props------", props.listType)
  
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  const listId = 2
 

  const [itemNames, setItemNames] = useState([])

//function to get items
  const getItemNames = () => {    
    console.log("making api call to get list item")
    axios.get(`/api/lists/items/?accountId=${accountId}&listId=${listId}`)
    .then(res => {
       const itemNameArray = res.data.lists;      
       setItemNames(itemNameArray)
      //console.log("item res---------", itemNameArray);
    });    
  };

  useEffect(() => {
    getItemNames();
  }, [])


  //function to delete a list
  const deleteItem = (id) => {
    const deleteitem = axios.delete(`/api/lists/items/${id}`)
    setItemNames(itemNames.filter(item => item.id !== id))    
   }
  
//console.log("item names----------------------",itemNames);
  return (
    <>     
    <ListsItemInput />
    <div>
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <table className="table list-table my-5">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
         {itemNames.map(item => (
                <tr key={item.id}>
                <td>{item.item}</td>
                <td>
                <button 
              className='btn btn-danger'
              onClick={() => deleteItem(item.id)}
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

export default ListItems