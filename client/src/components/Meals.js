import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditMeal from "./EditMeal";
import NewMeal from './NewMeal';
import "./Meals.css";

function Meal() {
  const [meals, setMeals] = useState([]);
  const userId = localStorage.getItem("user_id");
  const accountId = localStorage.getItem("account_id");
  console.log("========= ", userId, accountId);
  const navigate = useNavigate();
  const getMeals = () => {
    return axios
      .get(`/api/meals/?userId=${userId}&accountId=${accountId}`)
      .then((response) => {
        console.log("after get = ", response.data.mealsForWeek);
        setMeals(response.data.mealsForWeek);
      });
  };

  const updateMeal = (body) => {
    return axios
      .put(`/api/meals/?accountId=${accountId}&mealId=${body.id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("response = ", res.data);
        const newMeals = meals.map((meal) => {
          if (meal.id === res.data.updatedMeal.id) {
            return { ...res.data.updatedMeal };
          } else {
            return { ...meal };
          }
        });
        console.log("newMeals = ", newMeals);
        setMeals([...newMeals]);
        navigate("/meals");
      });
  };

  const deleteMeal = (id) => {
    axios.delete(`/api/meals/${id}`);
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  useEffect(() => {
    getMeals();
  }, []);
  console.log("mealssss = ", meals);
  return (
    <Fragment>

       <h1 id='heading'>Meals</h1>
      <div className="meal">
        <div className="meal_title">
          <h3>If You've Got The Time, We've Got The Meal!!!&#128523;</h3>
          <br/>
          <div className="card__header" id="meal_image">
            <img
              src="https://images.unsplash.com/photo-1631709497515-8c71f07630e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
              alt="card__image"
              class="card__image"
              width="600"
            />
          </div>
        </div>

        {meals.map((meal) => (
          <div
            className={
              meal.day === "Sunday" || meal.day === "Saturday"
                ? "top_meal"
                : "day_container"
            }
            key={meal.id}
          >
            <div >
              <div className="card" id="meal">
                <h5 className="btn btn-success btn-sm">{meal.day}</h5>
                <div className="card__header">
                  <img
                    src={`https://source.unsplash.com/600x400/?${meal.breakfast}`}
                    alt="card__image"
                    className="card__image"
                    width="400"
                  />
                </div>
                <br />

                <h6 id="day">
                  Breakfast<span> : {meal.breakfast}</span>
                </h6>
                <h6 id="day">
                  Lunch<span> : {meal.lunch}</span>
                </h6>
                <h6 id="day">
                  Snack<span> : {meal.snack}</span>
                </h6>
                <h6 id="day">
                  Dinner<span> : {meal.dinner}</span>
                </h6>
                <div id="card__footer">
                  <h5>
                    <EditMeal meal={meal} updateMeal={updateMeal} />
                    <button
                      class="btn btn-danger btn-sm"
                      onClick={() => deleteMeal(meal.id)}
                    >
                      Delete
                    </button>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="newMeal">
        {/* <Link to="/newMeal">
          <button type="button" class="btn btn-info">
            Add New Plan
          </button>
        </Link> */}
        <NewMeal />
      </div>
    </Fragment>
  );
}

export default Meal;
