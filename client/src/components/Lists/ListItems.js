import React, {useState,useEffect} from 'react'

function ListItems() {
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
      <td>Dresses</td>
      <td>Shoes</td>
    </tr> */}
    
  </tbody>
</table>
    </>
  )
}

export default ListItems