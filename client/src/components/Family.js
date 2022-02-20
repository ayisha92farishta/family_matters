import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Family.css'

function Family() {
  const [members, setMembers] = useState([]);
  const [familyName, setFamilyName] = useState('')

  const family_name = '';
  
    const accountId = localStorage.getItem('account_id');

    // function to get member names
    const getMemberNames = () => {
      axios.get(`/api/family/?accountId=${accountId}`)
      .then(res => {
        const familyMembersArray = res.data.familyMembers;
        console.log(familyMembersArray);
        setMembers(familyMembersArray);
      });    
    };

    useEffect(() => {
      getMemberNames();
    }, [])
 
// console.log("FAMILYNAME", familyName)
// console.log("MEMBER STATE", members )

  return (
    <div className='family-container'>
      <h1>Family Name : </h1>
      <h3> Members under this family: </h3>
      <table id="family-table"class="table">
        
        <tbody>
        {members.map(member => (
            <tr className='card'>
            <td value={member.last_name}>{member.first_name}</td>
            <td >{member.email}</td>
            <td><img src="blank-profile-picture.png"/> </td>
            </tr>
          )) 
         }
        </tbody>
      </table>
      <Link to="/contactsForm">
        <button type="button" className="btn btn-success">
          Add new member
        </button>
      </Link>
    </div>
  )
}

export default Family