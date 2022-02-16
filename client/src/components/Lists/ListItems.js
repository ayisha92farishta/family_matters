import React, {useState,useEffect} from 'react';
import axios from 'axios';

function ListItems() {
  
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  const listId = 3
  // console.log('userid------>', userId, 'Account id', accountId)

  const [itemNames, setItemNames] = useState([])

//function to get items
  const getItemNames = () => {    
    console.log("making api call to get list item")
    axios.get(`/api/lists/items/?userId=${userId}&listId=${listId}`)
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