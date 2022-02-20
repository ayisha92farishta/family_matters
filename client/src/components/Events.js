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

/*
  What needs to be completed : view events - needs date handeling - doesn't show date
  Might be nice to take out the view form out of events
  Remove or change the looks of the add new event button
*/


const localizer = momentLocalizer(moment);

const Events = () => {

  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [show, setShow] = useState(false);




  const handleClose = () => {
    setShow(false);
    navigate('/events');
  }
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
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
  
    return {
      ...event,
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "my event",
      description: "great"
    }

  }
  const createEvent = (e) => {
    let startDate = moment(e.start.toLocaleString())._i;    
    setSelectedDate(startDate);
    console.log("I am the chosen one", startDate);
    navigate('/EventForm');
  }

  const handleSelected = (e) => {
    console.log("These are the event details: ",e);
    setCurrentEvent(e);
    handleShow();
    //$("#event_model").modal()
    
  }

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
        <button type="button" class="btn btn-info">
          Add New Event
        </button>
      </Link>
    </div>
    <Modal className='modalEvents' show={show} onHide={handleClose} style={ {top:'20%'}}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="eventDetailsForm.description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={currentEvent.description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDetailsForm.date">
              <Form.Label>Event's date</Form.Label>
              <Form.Control type="date" placeholder={currentEvent.startDate}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDetailsForm.location">
              <Form.Label>Location</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={currentEvent.location} />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteEvent}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/eventUpdate" testValue="test">
            <Button variant="primary" onClick={handleClose} >
              Update
            </Button>        
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Events;
