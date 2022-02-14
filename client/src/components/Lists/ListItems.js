import React, {useState,useEffect} from 'react';
import axios from 'axios';

function ListItems() {
  const [itemNames, setItemNames] = useState([])

  const getItemNames = () => {
    const id = 1
    axios.get('/api/lists/:id')
    .then(res => {
      const itemNameArray = res;
      
      setItemNames(itemNameArray)
      console.log(res);
    });

    
  };

  // useEffect(() => {
  //   getItemNames();
  // }, [])
  
//console.log("item names----------------------",itemNames);
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
    {/* <tr>
      <th scope="row">1</th>
      <td>Bags</td>
      <td>Bags</td>
      <td>Dresses</td>
      <td>Shoes</td>
    </tr> */}
    
    {/* {itemNames.map(item => (
            <tr key={list.id}>
            <td>{list.name}</td>
            <td>Edit</td>
            <td>
              <button 
              className='btn btn-danger'
              
              >Delete</button>
            </td>
          </tr>
          )) 
         } */}
  </tbody>
</table>
    </>
  )
}

export default ListItems