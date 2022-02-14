import React, { Component }from 'react';
import '../App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Events extends Component {
  state = {
    events: [
      {
        // start: moment().toDate(),
        // end: moment()
        //   .add(1, "days")
        //   .toDate(),
        // title: "Some title"
      }
    ]
  };

 

  render() {
    return (
      <div className="App">
        <Calendar selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          //events={this.state.events}
          //onSelectEvent={event => this.onEventClick(event)}
          style={{ height: 750, marginLeft: 310, marginRight: 15 }}
        />
      </div>
    );
  }
}

export default Events;
