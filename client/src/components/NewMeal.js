import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function NewMeal() {

  const [day, setDay] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [snack, setSnack] = useState("");
  const [dinner, setDinner] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    
    event.preventDefault();
    const body = {
      day : day,
      breakfast: breakfast,
      lunch : lunch,
      snack : snack,
      dinner : dinner,
    };

    const userId = localStorage.getItem('user_id');
    const accountId = localStorage.getItem('account_id');
    
    console.log('body ===== ', body)
    axios.post(`/api/meals/?userId=${userId}&accountId=${accountId}`, body)
    .then(response => {
      console.log(response.data);
      navigate('/meals');
    })
  }
  return (
    <div>
      <div class="container">
      <form onSubmit={onSubmitForm}>
                <div class="form-group">
                  <label for="day" class="col-lg-2 control-label">Day</label>
                  <div >
                  <input type="text" className="form-control" id="day" value={day} placeholder="Enter the day" onChange={e => setDay(e.target.value)}/>
                  </div>
                </div>
                <div class="form-group">
                  <label for="breakfast" class=" control-label">Breakfast</label>
                  <div >
                    <input type="text" className="form-control" id="breakfast" value={breakfast} placeholder="For Breakfast" onChange={e => setBreakfast(e.target.value)}/>
                  </div>
                  
                </div>
                <div class="form-group">
                  <label for="lunch" class=" control-label">Lunch</label>
                  <div >
                  <input type="text" className="form-control" id="lunch" value={lunch} placeholder="For Lunch" onChange={e => setLunch(e.target.value)}/>
                  </div>
                  
                </div>
                <div class="form-group">
                  <label for="snack" class="control-label">Snack</label>
                  <div >
                  <input type="text" className="form-control" id="snack" value={snack} placeholder="For snack" onChange={e => setSnack(e.target.value)}/>
                  </div>
                 
                </div>
                <div class="form-group">
                  <label for="dinner" class=" control-label">Dinner</label>
                  
                  <div >
                  <input type="text" className="form-control" id="dinner" value={dinner} placeholder="For dinner" onChange={e => setDinner(e.target.value)}/>
                  </div>

                  
                </div>
                
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success" data-dismiss="modal" onSubmit={onSubmitForm}>Save</button>
                  <Link to="/meals">
                    <button type="button" class="btn btn-secondary btn-sm">Cancel</button>
                  </Link>
                </div>
        
                </form>
  
      </div>


    </div>
  );
}