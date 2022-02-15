import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ContactsForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      name : name,
      phone_number : number,
      email : email,
      address : address
    };
    axios.post('/api/contacts', body)
    .then(response => {
      console.log(response.data);
      navigate('/contacts');
    })
  }
  return (
    <div >
      <h3 className= "text-center ">New Contact</h3>
      
      <form class="d-flex justify-content-center align-items-center container " onSubmit={onSubmitForm}>
        <div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" className="form-control" value={name} placeholder="Enter name" onChange={e => setName(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="number">Phone Number</label>
            <input type="number" className="form-control" value={number} placeholder="Enter contact number" onChange={e => setNumber(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" className="form-control" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" className="form-control" value={address} placeholder="Enter address" onChange={e => setAddress(e.target.value)}/>
          </div>
          <br></br>
          <div  class="d-grid gap-2 d-md-flex">
            <button type="button" class="btn btn-primary btn-sm" type="submit" onSubmit={onSubmitForm}>Add Contact</button>
            <Link to="/contacts">
              <button type="button" class="btn btn-secondary btn-sm">Cancel</button>
            </Link>
          </div>
          </div>
        
      </form>
    </div>
  );
}