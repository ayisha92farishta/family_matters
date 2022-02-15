import React, { Component, useState }from 'react';
import '../App.css';


function Event_new (props) {
  const {closeCreateEvent, sDate} = props;
  console.log("hi i'm date",sDate)
  const [startDate, setStartDate] = useState("");
  return(
    <>
    <div className="event_modal">
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New message</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="title" class="col-form-label">Title:</label>
                  <input type="text" class="form-control" id="title"/>
                </div>
                <div class="form-group">
                  <label for="description" class="col-form-label">Description:</label>
                  <textarea class="form-control" id="description"></textarea>
                </div>
                <div class="form-group">
                  <label for="start_time" class="col-form-label">Start time:</label>
                  <input class="form-control" type="date" id="start_time" value={sDate}/>
                </div>
                <div class="form-group">
                  <label for="end_time" class="col-form-label">Start time:</label>
                  <input class="form-control" type="date" id="end_time"/>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeCreateEvent}>Cancel</button>
              <button type="button" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="event_modal">
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
    </div> */}

    </>

  )
}


export default Event_new;

