import React, { Component, useState }from 'react';
import '../App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event_new from './Event_new';

const localizer = momentLocalizer(moment);

//class Events extends Component {
const Events = () => {
  const [state, setState] = useState({
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
      }
    ],
    event_modal:false
  });
  // state = {
  //   events: [
  //     {
  //       start: moment().toDate(),
  //       end: moment()
  //         .add(1, "days")
  //         .toDate(),
  //       title: "Some title"
  //     }
  //   ]
  // };

  const createEvent = () => {
    console.log("ABC");
    setState({
      ...state,
      event_modal: true
    })
  }

  //render() {
    return (
      <>
      {state.event_modal && <Event_new />}
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
