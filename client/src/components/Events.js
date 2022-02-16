import React, { Component, useState }from 'react';
import '../App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event_new from './Event_new';
import axios from 'axios';

const localizer = momentLocalizer(moment);

//class Events extends Component {
const Events = () => {
  const [state, setState] = useState({
    events: [
      {
        // start: moment().toDate(),
        // end: moment()
        //   .add(1, "days")
        //   .toDate(),
        // title: "Some title"
      }
    ],
    event_modal:false,
    s_date: ""
  });

  const createEvent = (e) => {
    //console.log(e.start);
    let startDate = moment(e.start.toLocaleString()).format("YYYY-MM-DD");
    console.log(startDate);
    setState({
      ...state,
      event_modal: true,
      s_date: startDate
    })
  }

  const closeCreateEvent = () => {
    setState({
      ...state,
      event_modal: false
    })
  }

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
    closeCreateEvent();
  }

  //render() {
    return (
      <>
      {state.event_modal && <Event_new closeCreateEvent={closeCreateEvent} saveNewEvent={saveEvent} sDate={state.s_date}/>}
      <div className="App">
        <Calendar selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          //events={this.state.events}
          events={state.events}
          onSelectSlot={createEvent}
          style={{ height: 750, marginLeft: 310, marginRight: 15 }}
        />
      </div>
      </>
    );
  //}
}

export default Events;
