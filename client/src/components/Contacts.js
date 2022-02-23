import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditContact from './EditContact';
import "./Contacts.css";
import ContactsForm from './ContactsForm';

export default function Contacts() {
  const [contacts, setContact] = useState([])
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  const getContacts = () => {
    return axios.get(`/api/contacts/?userId=${userId}&accountId=${accountId}`)
      .then(response => {
        console.log(response.data.contacts);
        setContact(response.data.contacts)
      })
  }
  
  const updateContact = (body) => {
    return axios.put(`/api/contacts/?userId=${userId}&contactId=${body.id}`, body, {
      headers: {
      'Content-Type': 'application/json'
      }})
    .then(res => {
      console.log('response = ', res.data);
      const newContacts = contacts.map(contact => {
        if (contact.id === res.data.updatedContact.id) {
          return { ...res.data.updatedContact }
        } else {
          return { ...contact }
        }
      })
      setContact([...newContacts])
      navigate('/contacts');
    })
  }

  const deleteContact = (id) => {
    const delContact = axios.delete(`/api/contacts/${id}`)
    setContact(contacts.filter(contact => contact.id !== id))
  }
  
  useEffect(() => {
    getContacts();
  }, [])
  console.log('allContacts =', contacts)
  return (
    
    <div className="container" >

  
      <h2 id='title'>Family Contacts</h2>
              
    <table className="table table-bordered" id='contacts' >
      <thead className="thead-dark">
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
              <EditContact contact={contact} updateContact={updateContact} />
            </td>
            <td>
              <button type="button" className="btn btn-danger" 
                onClick={() => deleteContact(contact.id)}>
                  Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <ContactsForm/>
    </div>
    </div>
);
}