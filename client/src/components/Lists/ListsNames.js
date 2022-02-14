import React, {useState, useEffect} from 'react'
import axios from 'axios';

function ListsNames() {
  const [listNames, setListNames] = useState([])

  const getListNames = () => {
    //const body = ({description, listItem});

    axios.get('/api/lists')
    .then(res => {
      const listNameArray = res.data.lists;
      //console.log(listNameArray);
      setListNames(listNameArray)
    });

    
  };

  useEffect(() => {
    getListNames();
  }, [])
  
console.log("List names----------------------",listNames);
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
          {/* <tr>
            <th scope="row">1</th>
            <td>Bags</td>
            <td>Dresses</td>
            <td>Shoes</td>
          </tr> */}
          
         {listNames.map(list => (
            <tr key={list.list_id}>
            <td>{list.list}</td>
            <td>Edit</td>
            <td>
              <button 
              className='btn btn-danger'
              
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