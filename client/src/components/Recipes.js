import React, {useState, useEffect, Fragment }from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditRecipe from './EditRecipe';
import "./Recipes.css";


function Recipe() {
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate();
  const getRecipes = () => {
    return axios.get('/api/recipes')
      .then(response => {
        console.log('after get = ', response.data.recipes);
        setRecipes(response.data.recipes);
      })
  }
  
  const updateRecipe = (body) => {
    return axios.put(`/api/recipes/${body.id}`, body, {
      headers: {
      'Content-Type': 'application/json'
      }})
    .then(res => {
      console.log('response = ', res.data);
      const newRecipes = recipes.map(recipe => {
        if (recipe.id === res.data.updatedRecipe.id) {
          return { ...res.data.updatedRecipe }
        } else {
          return { ...recipe }
        }
      })
      setRecipes([...newRecipes])
      navigate('/recipes');
    })
  }

  const deleteRecipe = (id) => {
    axios.delete(`/api/recipes/${id}`)
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  useEffect(() => {
    getRecipes();
  }, [])
  console.log('recipeeeee = ', recipes);
  return (
    <Fragment>
      <div id="recipes">
        {
          recipes.map(recipe => (
            <div class="col-sm-9" key={recipe.id}>
              <h3>{recipe.name}</h3>
              <h5><span class="btn btn-secondary"> Post by {"username"}</span></h5>
              <br/>
              <h5><span class="btn btn-warning">Preparation Time</span>
                <span class="label label-warning">:  {recipe.preparation_time}</span>
              </h5>
              <br/>
              <h5><span class="btn btn-info">Cooking Time</span>
              
              <span class="label label-primary">:  {recipe.cooking_time}</span>
              </h5>
              <br></br>
          
              <div>
              <h4><span class="btn btn-success">Ingredients   </span>
          
              <span>
                :    {recipe.ingredients}
              </span></h4>
              </div>
              <div>
              <h4><span class="btn btn-success">Instructions   </span>
          
              <span>
                :   {recipe.instructions}
              </span></h4>
              </div>
              <div>
              <h5><EditRecipe recipe={recipe} updateRecipe={updateRecipe} />
                <button class="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </h5>
              </div>
          
            </div>
          ))
        }
        
        <div>
        <Link to="/newRecipe">
        <button type="button" class="btn btn-info">
          Add New Recipe
        </button>
      </Link>
        </div>
      </div>
      
    </Fragment>
      
 
  )
}

export default Recipe