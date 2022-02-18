import React, {useState, useEffect, Fragment }from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import EditMeal from './EditMeal';
//import "./Meals.css";


function Meal() {
  const [meals, setMeals] = useState([]);
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  console.log('========= ', userId, accountId);
  const navigate = useNavigate();
  const getMeals = () => {
    return axios.get(`/api/meals/?userId=${userId}&accountId=${accountId}`)
      .then(response => {
        console.log('after get = ', response.data.mealsForWeek);
        setMeals(response.data.mealsForWeek);
      })
  }
  
  const updateMeal = (body) => {
    return axios.put(`/api/meals/?userId=${userId}&mealId=${body.id}`, body, {
      headers: {
      'Content-Type': 'application/json'
      }})
    .then(res => {
      console.log('response = ', res.data);
      const newMeals = meals.map(meal => {
        if (meal.id === res.data.updatedMeal.id) {
          return { ...res.data.updatedMeal }
        } else {
          return { ...meal }
        }
      })
      setMeals([...newMeals])
      navigate('/meals');
    })
  }

  const deleteMeal = (id) => {
    axios.delete(`/api/meal/${id}`)
    setMeals(meals.filter(meal => meal.id !== id))
  }

  useEffect(() => {
    getMeals();
  }, [])
  console.log('mealssss = ', meals);
  return (
    <Fragment>
        <div class="meal">
        <h3>If You've Got The Time, We've Got The Meal!!!&#128523;</h3>
        <div >
          <div class="row1">
          <div class="column" id="Sunday">
            <div class="card" id="meal">
              <h5>Sunday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>
          <div class="card__header">
                <img src="https://source.unsplash.com/600x400/?food" alt="card__image" class="card__image" width="600" />
              </div>
          <div class="column" id="Saturday">
            <div class="card" id="meal">
              <h5>Saturday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>
          
          <div class="row2">
          <div class="column" id="Monday">
            <div class="card" id="meal">
              <h5>Monday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>
          <div class="column" id="Tuesday">
            <div class="card" id="meal">
              <h5>Tuesday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>
          <div class="column" id="Wednesday">
            <div class="card" id="meal">
              <h5>Wednesday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>
          <div class="column" id="Thursday">
            <div class="card" id="meal">
              <h5>Thursday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>
          <div class="column" id="Friday">
            <div class="card" id="meal">
              <h5>Friday</h5>
              <h6>Breakfast<span> : Description</span></h6>
              <h6>Lunch<span> : Description</span></h6>
              <h6>Snack<span> : Description</span></h6>
              <h6>Dinner<span> : Description</span></h6>
            </div>
          </div>



          </div>
          </div>
          
          
        </div>
        </div>
        <div class="newMeal">
        <Link to="/newMeal">
        <button type="button" class="btn btn-info">
          Add New Plan
        </button>
      </Link>
        </div>
      
    </Fragment>
    
      
 
  )
}

export default Meal