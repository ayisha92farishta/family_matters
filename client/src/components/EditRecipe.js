import React, { Fragment, useState} from 'react';

function EditRecipe(props) {
  const recipe = props.recipe;
  console.log('======', recipe)
  const [name, setName] = useState(recipe.name);
  const [image, setImage] = useState(recipe.thumbnail_photo_url);
  const [prepTime, setPrepTime] = useState(recipe.preparation_time);
  const [cookTime, setCookTime] = useState(recipe.cooking_time);
  const [serving, setServing] = useState(recipe.serving);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [posted_by, setPosted_by] = useState(recipe.posted_by);

  const updateRecipe = (event) => {
    event.preventDefault();
    const body = {
      id: recipe.id,
      name : name,
      thumbnail_photo_url : image,
      preparation_time : prepTime,
      cooking_time : cookTime,
      serving : serving,
      ingredients : ingredients,
      instructions : instructions,
      posted_by : posted_by
    };
    console.log('body before reaching update function = ', body);
    props.updateRecipe(body);
  }
  return (
    <Fragment>
      <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${recipe.id}`}>
        Update
      </button>

      <div class="modal fade" id={`id${recipe.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Update Recipe</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div>
              <label for="name">Name</label>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
              <label for="image">Image</label>
              <input type="text" className="form-control" value={image} onChange={e => setImage(e.target.value)}/>
            </div>
            <div>
              <label for="prepTime">Preparation Time</label>
              <input type="number" className="form-control" value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
            </div>
            <div>
              <label for="prepTime">Cooking Time</label>
              <input type="number" className="form-control" value={cookTime} onChange={e => setCookTime(e.target.value)}/>
            </div>
            <div>
              <label for="serving">Serving</label>
              <input type="number" className="form-control" value={serving} onChange={e => setServing(e.target.value)}/>
            </div>
            <div>
              <label for="ingredients">Ingredients</label>
              <input type="text" className="form-control" value={ingredients} onChange={e => setIngredients(e.target.value)}/>
            </div><div>
              <label for="instructions">Instructions</label>
              <input type="text" className="form-control" value={instructions} onChange={e => setInstructions(e.target.value)}/>
            </div>
            </div>
            <div>
              <label for="posted_by">Post by</label>
              <input type="text" className="form-control" value={posted_by} onChange={e => setPosted_by(e.target.value)}/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal" onClick={event => updateRecipe(event)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  )
}

export default EditRecipe