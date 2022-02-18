import React, { Component, useState, useEffect }from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EventForm (props) {
  const {sDate} = props;
  //console.log("hi i'm date",sDate)
  const [startDate, setStartDate] = useState(sDate);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  //console.log(startDate, title, description);

  const navigate = useNavigate();
  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      title : title,
      description : description,
      startDate : startDate,
      location : location,
      user_id : localStorage.getItem('user_id'),
      account_id : localStorage.getItem('account_id')
    };
    console.log(localStorage.getItem('user_id'));
    axios.post('/api/events', body)
    .then(response => {
      console.log(response.data);
      navigate('/events');
    })
  }
  return(
    <>

<div >
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
    </div>


    {/* <div className="event_modal">
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New Event : </h5>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="title" class="col-form-label">Title:</label>
                  <input type="text" class="form-control" id="title" onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div class="form-group">
                  <label for="description" class="col-form-label">Description:</label>
                  <textarea class="form-control" id="description" onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div>
                  <label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                  All Day
                  </label>
                </div>
                <div class="form-group">
                  <label for="start_time" class="col-form-label">Start time:</label>
                  <input class="form-control" type="date" id="start_time" value={startDate} onChange={(event) => setStartDate(event.target.value)}/>
                </div>
                <div class="form-group">
                  <label for="end_time" class="col-form-label">End time:</label>
                  <input class="form-control" type="date" id="end_time"/>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeCreateEvent}>Cancel</button>
              <button type="button" class="btn btn-primary" onClick={() => saveNewEvent(startDate, title, description)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>

  )
}


export default EventForm;

