import React, { Component, useState, useEffect }from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl, Stack } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*
  What needs to be completed : handeling start and end time, a label for start time,
  a bit of styling and/or spacing (gap)?
*/

function EventForm () {
  const [startDate, setStartDate] = useState(localStorage.getItem('selectedDateByUser'));//event_date
  const [title, setTitle] = useState("");//event_name
  const [description, setDescription] = useState("");//event_description
  const [location, setLocation] = useState("");//location
  const [allDay, setAllDay] = useState(false);//all_day
  const [startTime, setStartTime] = useState();//start_time
  const [endTime, setEndTime] = useState();//end_time
  const [isPrivate, setIsPrivate] = useState(false);//is_private
  //reminder

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    navigate('/events');

  }
  const handleShow = () => setShow(false);

  const setAllDay_bool = (val) => {
    if(val === "on")
      setAllDay(true);
  }

  const setIsPrivate_bool = (val) => {
    if(val === "on")
      setIsPrivate(true);
  }

  const onDeleteClick = () => {

  }

  const navigate = useNavigate();
  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      title : title,
      description : description,
      startDate : startDate,    
      allDay: allDay,
      startTime: startTime,
      endTime: endTime,
      isPrivate: isPrivate,
      location : location,
      user_id : localStorage.getItem('user_id'),
      account_id : localStorage.getItem('account_id')
    };
    axios.post('/api/events', body)
    .then(response => {
      console.log(response.data);
      navigate('/events');
    })
  }
  return(
    
      <Modal className='modalEvents' show={show} onHide={handleClose} style={ {top:'20%'}}>
          <Modal.Header closeButton>
            <Modal.Title>New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newEventForm.title">
              <Form.Label>Title</Form.Label>
              <FormControl as="textarea" rows={1} onChange={e => {setTitle(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newEventForm.description">
              <Form.Label>Description</Form.Label>
              <FormControl as="textarea" rows={3} onChange={e => {setDescription(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newEventForm.date">
              <Form.Label>Event's date</Form.Label>
              <DatePicker  value={startDate} onChange={e => {setStartDate(e.target.value)}} />
            </Form.Group>
            <Form.Check 
                type="switch"
                id="allDay-switch"
                label="All day"
                onChange={e => {setAllDay_bool(e.target.value)}}
            />
            {/* </Form>
            { <TimePicker start="07:00" end="23:99" step={30} onChange={e => {setStartTime(e.target.value)}}/>
            <TimePicker start="07:00" end="23:99" step={30} onChange={e => {setEndTime(e.target.value)}}/> }
            <Form> */}
            <Form.Check 
                type="switch"
                id="isPrivate-switch"
                label="Private"
                onChange={e => {setIsPrivate(e.target.value)}}
            />
            <Form.Group className="mb-3" controlId="newEventForm.location">
              <Form.Label>Location</Form.Label>
              <FormControl type="text" aria-label="With textarea" onChange={e => {setLocation(e.target.value)}}/>
            </Form.Group>
            </Form> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmitForm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

  )
}

export default EventForm;

