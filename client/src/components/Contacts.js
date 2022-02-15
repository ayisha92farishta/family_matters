import React, { useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditContact from './EditContact';
import "./Contacts.css";

export default function Contacts() {
  const [contacts, setContact] = useState([])
  const navigate = useNavigate();
  const getContacts = () => {
    const listContacts = axios.get('/api/contacts')
      .then(response => {
        console.log(response.data.contacts);
        setContact(response.data.contacts)
      })
  }
  const deleteContact = (id) => {
    const delContact = axios.delete(`/api/contacts/${id}`)
    setContact(contacts.filter(contact => contact.id !== id))
  }
  
  useEffect(() => {
    getContacts();
  }, [])
  console.log('c =', contacts)
  return (
    
    <div class="container"><h2 id='title'>My Contacts</h2>
             
    <table class="table table-bordered" id='contacts'>
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Address</th>
          <th colspan='2'>Action</th>
        </tr>
      </thead>
      <tbody>
        { contacts.map(contact => (
          <tr key={contact.id}>
            <td>{contact.name}</td>
            <td>{contact.phone_number}</td>
            <td>{contact.email}</td>
            <td>{contact.address}</td>
            <td>
              <EditContact contact={contact}/>
            </td>
            <td>
              <button type="button" class="btn btn-danger" 
                onClick={() => deleteContact(contact.id)}>
                  Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <Link to="/contactsForm">
        <button type="button" class="btn btn-info">
          New Contact
        </button>
      </Link>
    </div>
    </div>
);
}