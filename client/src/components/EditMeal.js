import React, { Fragment, useState} from 'react';

function EditMeal(props) {
  const meal = props.meal;
  const [day, setDay] = useState(meal.day);
  const [breakfast, setBreakfast] = useState(meal.breakfast);
  const [lunch, setLunch] = useState(meal.lunch);
  const [snack, setSnack] = useState(meal.snack);
  const [dinner, setDinner] = useState(meal.dinner);

  const updateMeal = (event) => {
    event.preventDefault();
    const body = {
      id: meal.id,
      day : day,
      breakfast : breakfast,
      lunch : lunch,
      snack : snack,
      dinner : dinner
    };
    console.log('body before reaching update function = ', body);
    props.updateMeal(body);
  }
  return (
    <Fragment>
      <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target={`#id${meal.id}`}>
        Update
      </button>

      <div class="modal fade" id={`id${meal.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Update Meal</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div>
              <label for="day">Day</label>
              <input type="text" className="form-control" value={day} onChange={e => setDay(e.target.value)}/>
            </div>
            <div>
              <label for="breakfast">Breakfast</label>
              <input type="text" className="form-control" value={breakfast} onChange={e => setBreakfast(e.target.value)}/>
            </div>
            <div>
              <label for="lunch">Lunch</label>
              <input type="text" className="form-control" value={lunch} onChange={e => setLunch(e.target.value)}/>
            </div>
            <div>
              <label for="snack">Snack</label>
              <input type="text" className="form-control" value={snack} onChange={e => setSnack(e.target.value)}/>
            </div>
            <div>
              <label for="dinner">Dinner</label>
              <input type="text" className="form-control" value={dinner} onChange={e => setDinner(e.target.value)}/>
            </div>
           
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal" onClick={event => updateMeal(event)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  )
}

export default EditMeal