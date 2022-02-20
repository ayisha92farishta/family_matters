import React, { Component, useState, useEffect }from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl, Stack } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import TimePicker from 'react-bootstrap-time-picker';

/*
  What needs to be completed : handeling start and end time, a label for start time,
  a bit of styling and/or spacing (gap)?
*/

function EventForm (props) {
  const {sDate} = props;
  const [startDate, setStartDate] = useState(sDate);//event_date
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
    <>
    <Stack gap={3}>
      <Modal className='modalEvents' show={show} onHide={handleClose} style={ {top:'20%'}}>
          <Modal.Header closeButton>
            <Modal.Title>New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <InputGroup.Text >Title</InputGroup.Text>
              <FormControl type="text" aria-label="With textarea" onChange={e => {setTitle(e.target.value)}}/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <FormControl as="textarea" aria-label="With textarea" onChange={e => {setDescription(e.target.value)}}/>
            </InputGroup>
            <Form.Control type="date" name='StartDate' onChange={e => {setStartDate(e.target.value)}}/>
            <Form>
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
            </Form>
            <InputGroup>
              <InputGroup.Text>Location</InputGroup.Text>
              <FormControl type="text" aria-label="With textarea" onChange={e => {setLocation(e.target.value)}}/>
            </InputGroup>
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
      </Stack>
      {/* <div >
        <h3 className= "text-center ">New Event</h3>
        
        <form class="d-flex justify-content-center align-items-center container " onSubmit={onSubmitForm}>
          <div>
            <div class="form-group">
              <label for="name">Title</label>
              <input type="text" className="form-control" value={title} placeholder="Enter event title" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" className="form-control" value={description} placeholder="Enter event description" onChange={e => setDescription(e.target.value)}/>
            </div>
            <div class="form-group">
              <label for="date">Date</label>
              <input type="date" className="form-control" value={startDate} placeholder={startDate} onChange={e => setStartDate(e.target.value)}/>
            </div>
            <div class="form-group">
              <label for="address">Location</label>
              <input type="text" className="form-control" value={location} placeholder="Enter address" onChange={e => setLocation(e.target.value)}/>
            </div>
            <br></br>
            <div  class="d-grid gap-2 d-md-flex">
              <button type="button" class="btn btn-primary btn-sm" type="submit" onSubmit={onSubmitForm}>Add Event</button>
              <Link to="/events">
                <button type="button" class="btn btn-secondary btn-sm">Cancel</button>
              </Link>
            </div>
            </div>
          
        </form>
      </div> */}
    </>

  )
}


export default EventForm;

