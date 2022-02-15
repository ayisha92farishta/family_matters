import React, {useState,useEffect} from 'react';
import axios from 'axios';

function ListItems() {

  //getting account and userid from local storage
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  const listId = 1
  // console.log('userid------>', userId, 'Account id', accountId)

  const [itemNames, setItemNames] = useState([])

  const getItemNames = () => {    
    axios.get(`/api/lists/items/?userId=${userId}&listId=${listId}`)
    .then(res => {
      // const itemNameArray = res;      
      // setItemNames(itemNameArray)
      console.log("item res---------", res);
    });

    
  };

  // useEffect(() => {
  //   getItemNames();
  // }, [])
  
console.log("item names----------------------",itemNames);
  return (
    <>     
    <table className="table  my-5">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {/* {itemNames.map(item => (
                <tr key={item.id}>
                <td>{item.name}</td>
                <td>Edit</td>
                <td>
                  <button 
                  className='btn btn-danger'
                  >Delete</button>
                </td>
              </tr>
              )) 
            }  */}
      </tbody>
    </table>
  
  </>
  )
}

export default ListItems