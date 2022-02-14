import React, {useState, useEffect} from 'react'
import axios from 'axios';

function ListsNames() {
  const [listNames, setListNames] = useState('')

  const getListNames = () => {
    //const body = ({description, listItem});

    axios.get('/api/lists')
    .then(res => {
      console.log(res);
    });

  };

  useEffect(() => {
    getListNames();
  }, [])
  

  return (
    
    <>
    <h1>Lists that already exists</h1>
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
            <td>Dresses</td>
            <td>Shoes</td>
          </tr> */}
          
        </tbody>
      </table>
    </>
  )
}

export default ListsNames