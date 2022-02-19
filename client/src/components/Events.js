import React, { Component, useState, useEffect }from 'react';
import '../App.css';
import Nav from './Nav';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const localizer = momentLocalizer(moment);

const Events = () => {

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const getEvents = () => {
    const body = {
      user_id : localStorage.getItem('user_id'),
      account_id : localStorage.getItem('account_id')
      
    };
    console.log("Where is the body",body);
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
    return {
      ...event,
      start: startTime.toDate(),
      title: event.event_name,
      description: event.event_description,
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

  useEffect(() => {
    getEvents();
  }, [])
  console.log('allEvents =', events)

  return (
    <>
    
      {/* {state.event_modal && <EventForm closeCreateEvent={closeCreateEvent} saveNewEvent={saveEvent} sDate={state.s_date}/>} */}
      <div className="App">
      <Calendar 
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        //events={events.events_list}
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
    </>
  );
}

export default Events;
//axios.post('http://localhost:4000/api/events'