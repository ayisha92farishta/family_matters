import React, { useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
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
      {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control size="lg" type="text" value="name" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control size="lg" type="number" placeholder="Enter number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control size="lg" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control size="lg" type="address" placeholder=" Enter address" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Contact
        </Button>
      </Form> */}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
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
          <button type="button" class="btn btn-primary" type="submit" onSubmit={onSubmitForm}>Add Contact</button>
        </div>

      </form>
    </div>
  );
}