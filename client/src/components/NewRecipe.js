import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function NewRecipe() {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [serving, setServing] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    
    event.preventDefault();
    const body = {
      name : name,
      thumbnail_photo_url : image,
      preparation_time: prepTime,
      cooking_time : cookTime,
      serving : serving,
      ingredients : ingredients,
      instructions : instructions
    };

    const userId = localStorage.getItem('user_id');
    const accountId = localStorage.getItem('account_id');
    
    console.log('body ===== ', body)
    axios.post(`/api/recipes/?userId=${userId}&accountId=${accountId}`, body)
    .then(response => {
      console.log(response.data);
      navigate('/recipes');
    })
  }
  return (
    <div>
      <div class="container">
      <form onSubmit={onSubmitForm}>
                <div class="form-group">
                  <label for="recipe-name" class="col-lg-2 control-label"> Name</label>
                  <div >
                  <input type="text" className="form-control" id="recipe-name" value={name} placeholder="Enter recipe name" onChange={e => setName(e.target.value)}/>
                  </div>
                </div>
                <div class="form-group">
                  <label for="recipe-image" class="col-lg-2 control-label"> Image</label>
                  <div >
                  <input type="text" className="form-control" id="recipe-image" value={image} placeholder="Enter image address" onChange={e => setImage(e.target.value)}/>
                  </div>
                </div>

                <div class="form-group">
                  <label for="prepTime" class=" control-label">Preparation Time</label>
                  <div >
                    <input type="number" className="form-control" id="prepTime" value={prepTime} placeholder="Enter preparation time" onChange={e => setPrepTime(e.target.value)}/>
                  </div>
                  
                </div>
                <div class="form-group">
                  <label for="cookTime" class=" control-label">Cooking Time</label>
                  <div >
                  <input type="number" className="form-control" id="cookTime" value={cookTime} placeholder="Enter cooking time" onChange={e => setCookTime(e.target.value)}/>
                  </div>
                  
                </div>
                <div class="form-group">
                  <label for="servings" class="control-label">Serves</label>
                  <div >
                  <input type="number" className="form-control" id="servings" value={serving} placeholder="Enter servings" onChange={e => setServing(e.target.value)}/>
                  </div>
                 
                </div>
                <div class="form-group">
                  <label for="ingredients" class=" control-label">Ingredients</label>
                  <div>
                  <textarea name="textarea" className="form-control" rows="5" cols="40" id="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)}>Enter required ingredients...</textarea>

                  </div>
                </div>
                <div class="form-group">
                  <label for="instructions" class=" control-label">Instructions</label>
                  <div> <textarea name="textarea" className="form-control" rows="5" cols="40" id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)}>Enter the instructions...</textarea></div>
                 
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success" data-dismiss="modal" onSubmit={onSubmitForm}>Save</button>
                  <Link to="/recipes">
                    <button type="button" class="btn btn-secondary btn-sm">Cancel</button>
                  </Link>
                </div>
        
                </form>
  
      </div>


    </div>
  );
}