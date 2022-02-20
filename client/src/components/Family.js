import React from 'react'
import './Family.css'

function Family() {

  return (
    <div className='family-container'>
      <h1>Family Name : </h1>
      <h3> Members under this family: </h3>
      <table id="family-table"class="table">
        <thead>
          <tr>
            <th scope="col">First</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
          
        </tbody>
      </table>
    </div>
  )
}

export default Family