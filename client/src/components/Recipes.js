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
      <div><h3>Delight in every bite !!!&#128523;</h3></div>
      <div class="container" id="recipes">
        {
          recipes.map(recipe => (
            <div class="card" key={recipe.id}>
              <div text-align="center">
                <h3>{recipe.name}</h3>
                <h5><span class="btn btn-secondary"> Post by {"username"}</span></h5>
              </div>
              <div >
              <div class="card__header">
                <img src="https://source.unsplash.com/600x400/?recipes" alt="card__image" class="card__image" width="600" />
              </div>
              <div class="card-body">
                  <div >
                    <h4><span class="tag tag-brown">Ingredients   </span></h4>
          
                    <p>{recipe.ingredients}</p>
                    
                  </div>
                  <div >
                    <h4><span class="tag tag-blue">Instructions   </span></h4>
          
                    <p>{recipe.instructions}</p>
                  </div>
              </div>
                <div >
                  <br/>
                  <h5><span class="tag tag-orange">Preparation Time</span>
                  <span class="label label-warning">:  {recipe.preparation_time}</span>
                  </h5>
                <br/>
                <h5><span class="tag tag-green">Cooking Time</span>
              
                  <span class="label label-primary">:  {recipe.cooking_time}</span>
                </h5>
                 <br></br>
                
                </div>
                

              </div>
              
              <div id="card__footer" >
              <h5><EditRecipe recipe={recipe} updateRecipe={updateRecipe} />
                <button class="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </h5>
              </div>
          
            </div>
          ))
        }
      </div>
      <div class="newRecipe">
        <Link to="/newRecipe">
        <button type="button" class="btn btn-info">
          Add New Recipe
        </button>
      </Link>
        </div>
      
    </Fragment>
    
      
 
  )
}

export default Recipe