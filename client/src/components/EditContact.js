import React, { Fragment, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditContact({contact}) {

  const [name, setName] = useState([contact.name]);
  const [number, setNumber] = useState([contact.phone_number]);
  const [email, setEmail] = useState([contact.email]);
  const [address, setAddress] = useState([contact.address]);
  
  const navigate = useNavigate();
  
  const updateContact = (event) => {
    event.preventDefault();
    const body = {
      name : name,
      phone_number : number,
      email : email,
      address : address
    };
    return axios.put(`/api/contacts/${contact.id}`, body, {
      headers: {
      'Content-Type': 'application/json'
      }})
    .then(res => {
      console.log(res.data);
      setName(res.data.name);
      setNumber(res.data.phone_number);
      setEmail(res.data.email);
      setAddress(res.data.address);
      navigate('/contacts');
    })
  }
  return (
    <Fragment>
      <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${contact.id}`}>
        Update
      </button>

      <div class="modal fade" id={`id${contact.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Update Contact</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div>
              <label for="name">Name</label>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
              <label for="number">Phone Number</label>
              <input type="number" className="form-control" value={number} onChange={e => setNumber(e.target.value)}/>
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
              <label for="address">Address</label>
              <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)}/>
            </div>
            
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal" onClick={e => updateContact(e)}>Save</button>
              {/* <button type="button" class="btn btn-secondary">Close</button> */}
            </div>
          </div>
        </div>
      </div>




    </Fragment>
    
  )
}

export default EditContact