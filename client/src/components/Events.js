import React, { Component, useState, useEffect }from 'react';
import '../App.css';
import Nav from './Nav';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Stack, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { color } from '@mui/system';
import { blue } from '@mui/material/colors';
/*
  What needs to be completed : view events - needs date handeling - doesn't show date
  Might be nice to take out the view form out of events
  Remove or change the looks of the add new event button
*/


const localizer = momentLocalizer(moment);

const Events = () => {

  const [events, setEvents] = useState([]);//holds all events for a user
  const [currentEvent, setCurrentEvent] = useState({
    eventId: 0,
    title: "",
    description: "",
    date: new Date(),
    location: ""
  });//the event I'm viewing 
  const [selectedDate, setSelectedDate] = useState(new Date());//?
  const [show, setShow] = useState(false);//used for showing/hiding modal pop up form

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");//event_name

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate('/events');
  }
  const handleShow = () => setShow(true);

  
//server functions
  const getEvents = () => {
    const body = {
      user_id : localStorage.getItem('user_id'),
      account_id : localStorage.getItem('account_id')
      
    };
    return axios.get('/api/events',{
      params: body
    })
      .then(response => {
        console.log("Events from server : ",response.data);
        setEvents(response.data.map((event)=> transformEvent(event)));
      })
  };

  // const saveEvent = (startDate, title, description) => {
  //   console.log(startDate, title, description);
  //   let eventObj = {
  //     startDate,
  //     title,
  //     description
  //   }
  //   console.log("Save this event:", eventObj);
  //   axios.post('http://localhost:8001/api/events', eventObj)
  //     .then(res => {
  //       console.log("I'm back", res);
  //     });
  // }

  const saveEvent = (startDate, title, description) => {
    console.log(startDate, title, description);
    let eventObj = {
      startDate,
      title,
      description
    }
    axios.post('http://localhost:4000/api/events', eventObj)
      .then(res => {
        console.log("I'm back", res);
      });
  }
  const deleteEvent = () => {
    const eventToDelete = currentEvent.eventId;
    console.log(eventToDelete);
    axios.delete(`/api/events/${eventToDelete}`)
      .then(res => {
        console.log("back from delete on the server")
      })
    setEvents(events.filter(e => e.id !== eventToDelete));
    handleClose();
  }

  const updateEvent = () => {
    const user = localStorage.getItem('user_id');
    console.log("my user is ",user);
    return axios.put(`/api/events/?userId=${user}&eventId=${currentEvent.eventId}`,currentEvent)
    .then(res => {
      console.log("put response", res.data)
      getEvents();
    })
    handleClose();

    // .then(res => {
    //   console.log('response = ', res.data);
    //   const newContacts = contacts.map(contact => {
    //     if (contact.id === res.data.updatedContact.id) {
    //       return { ...res.data.updatedContact }
    //     } else {
    //       return { ...contact }
    //     }
    //   })
    //   setContact([...newContacts])
    //   navigate('/contacts');
    // })
  
  }

//---------------------------------------------------------------------------------
  const transformEvent = (event)=> {
    const startTime = moment(event.event_date, 'YYYY-MM-DD');
    console.log("start time after formatting is: ", startTime);
    return {
      ...event,
      start: startTime.toDate(),//?
      title: event.event_name,
      description: event.event_description,
      location: event.event_address,
      eventId: event.id,
      //start: moment().toDate(),
      end: startTime.add(1, "days").toDate()

     }

  }
  const createEvent = (e) => {    
    let startDate = moment(e.start).format('YYYY-MM-DD');
    setSelectedDate(startDate);
    localStorage.setItem('selectedDateByUser', startDate);
    navigate('/EventForm');
  }

  const handleSelected = (e) => {
    console.log("These are the event details: ",e);
    const eventDate = moment(e.event_date, 'YYYY-MM-DD');
    const date = moment(e.event_date).toDate();
    let selectedEvent = {
      eventId: e.eventId,
      title: e.title,
      description: e.description,
      date: eventDate,
      location: e.location
    }
    setCurrentEvent(selectedEvent);
    setSelectedDate(date);
    handleShow();
  }

  // const saveEvent = (startDate, title, description) => {
  //   console.log(startDate, title, description);
  //   let eventObj = {
  //     startDate,
  //     title,
  //     description
  //   }
  //   axios.post('http://localhost:4000/api/events', eventObj)
  //     .then(res => {
  //       console.log("I'm back", res);
  //     });
  // }

  const setCurrentitle = (e) => {
    const title = e.target.value;
    setCurrentEvent((prev) => ({ ...prev, title}))
  }

  useEffect(() => {
    getEvents();
  }, [])
  console.log('allEvents =', events)

  return (
    <>
      <div className="App">
      <Calendar 
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        onSelectSlot={createEvent}
        onSelectEvent={handleSelected}
        style={{ height: 750, marginLeft: 310, marginRight: 15 }} // need to move to css file
      />
      </div>
      <div>
      <Link to="/eventForm">
        <button type="button" class="btn btn-info" variant="primary" style={{ position: 'absolute',
                left: 310
                }}>
          Add a New Event
        </button>
      </Link>
    </div>
    <Modal className='modalEvents' show={show} onHide={handleClose} style={ {top:'20%'}}>
        <Modal.Header closeButton>
          <Modal.Title> My Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="eventDetailsForm.title">
              <Form.Label>Title</Form.Label>
              <Form.Control as="textarea" rows={1} value={currentEvent.title} onChange={(event) => setCurrentEvent((prev) => ({ ...prev, title: event.target.value}))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDetailsForm.description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={currentEvent.description} onChange={(event) => setCurrentEvent((prev) => ({ ...prev, description: event.target.value}))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDetailsForm.date">
              <Form.Label>Event's date</Form.Label>
              <DatePicker selected={selectedDate} onChange={(event) => setCurrentEvent((prev) => ({ ...prev, date: event.target.value}))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDetailsForm.location">
              <Form.Label>Location</Form.Label>
              <Form.Control as="textarea" rows={1} value={currentEvent.location} onChange={(event) => setCurrentEvent((prev) => ({ ...prev, location: event.target.value}))}/>
            </Form.Group>
          </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteEvent}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/events" testValue="test">
            <Button variant="primary" onClick={updateEvent}>
              Update
            </Button>        
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Events;
