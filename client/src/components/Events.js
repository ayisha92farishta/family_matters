import React, { Component, useState, useEffect }from 'react';
import '../App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

var myEventsList = [
  {
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "my event",
    description: "great"
  }

];


//My state holds an array of events and the selected day clicked by the user
const Events = () => {
  const [events, setEvents] = useState({
    events_list: [{}],
    selected_date: ""//?
  });

  const navigate = useNavigate();
  const getEvents = () => {
    return axios.get('/api/events')
      .then(response => {
        console.log(response.data.events);
        setEvents(response.data.events)
      })
  }

  const createEvent = (e) => {
    let startDate = moment(e.start.toLocaleString())._i;
    //let startDate = moment(e.start.toLocaleString()).format("YYYY-MM-DD");
    console.log(startDate);
    setEvents({
      ...events,
      selected_date: startDate
    })
  }

  // const closeCreateEvent = () => {
  //   setState({
  //     ...state,
  //     event_modal: false
  //   })
  // }

  const saveEvent = (startDate, title, description) => {
    console.log(startDate, title, description);
    let eventObj = {
      startDate,
      title,
      description
    }
    axios.post('http://localhost:8001/api/events', eventObj)
      .then(res => {
        console.log("I'm back", res);
      });
    //closeCreateEvent();
  }

  return (
    <>
      {/* {state.event_modal && <EventForm closeCreateEvent={closeCreateEvent} saveNewEvent={saveEvent} sDate={state.s_date}/>} */}
      <div className="App">
      <Calendar 
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={myEventsList}
        //events={events.events_list}
        onSelectSlot={createEvent}
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
//axios.post('http://localhost:8001/api/events'