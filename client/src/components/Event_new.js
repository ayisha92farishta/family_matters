import React, { Component }from 'react';
import '../App.css';


function Event_new () {
  return(
    <>
    <div className="event_modal">
      <form> 
        <div>
          <p>Title</p>
          <input type="text" name="title" />
        </div>
        <div>
          <p>Start Date</p>
          <input type="date" name="start_date" />
        </div>
        <div>
          <p>End Date</p>
          <input type="date" name="end_date" />
        </div>
      </form>
    </div>
    </>

  )
}


export default Event_new;

