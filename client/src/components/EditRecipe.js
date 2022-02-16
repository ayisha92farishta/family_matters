import React, { Fragment, useState} from 'react';

function EditRecipe(props) {
  const recipe = props.recipe;
  const [name, setName] = useState(recipe.name);
  const [prepTime, setPrepTime] = useState(recipe.preparation_time);
  const [cookTime, setCookTime] = useState(recipe.cooking_time);
  const [serving, setServing] = useState(recipe.servings);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const updateRecipe = (event) => {
    event.preventDefault();
    const body = {
      id: recipe.id,
      name : name,
      preparation_time : prepTime,
      cooking_time : cookTime,
      serving : serving,
      ingredients : ingredients,
      instructions : instructions
    };

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
              <label for="number">Preparation Time</label>
              <input type="number" className="form-control" value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
            </div>
            <div>
              <label for="email">Cooking Time</label>
              <input type="email" className="form-control" value={cookTime} onChange={e => setCookTime(e.target.value)}/>
            </div>
            <div>
              <label for="address">Serving</label>
              <input type="text" className="form-control" value={serving} onChange={e => setServing(e.target.value)}/>
            </div>
            <div>
              <label for="address">Ingredients</label>
              <input type="text" className="form-control" value={ingredients} onChange={e => setIngredients(e.target.value)}/>
            </div><div>
              <label for="address">Instructions</label>
              <input type="text" className="form-control" value={instructions} onChange={e => setInstructions(e.target.value)}/>
            </div>
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