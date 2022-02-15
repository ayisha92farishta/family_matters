import React, { useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
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
    <div>
      <h3 className= "text-center ">New Contact</h3>
      {/* <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control size="lg" type="text" value={name} placeholder="Enter name" onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control size="lg" type="number" value={number} placeholder="Enter number" onChange={e => setNumber(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control size="lg" type="email" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control size="lg" type="address" value={address} placeholder=" Enter address" onChange={e => setAddress(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onSubmit={onSubmitForm} >
          Add Contact
        </Button>
      </Form> */}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div>
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
        <div>
          <br></br>
          <button type="button" class="btn btn-primary" type="submit" onSubmit={onSubmitForm}>Add Contact</button>
          <Link to="/contacts">
            <button type="button" class="btn btn-secondary">Cancel</button>
          </Link>
        </div>


        </div>
        
      </form>
    </div>
  );
}