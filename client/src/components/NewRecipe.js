import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewRecipe() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [serving, setServing] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [posted_by, setPosted_by] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      name: name,
      thumbnail_photo_url: image,
      preparation_time: prepTime,
      cooking_time: cookTime,
      serving: serving,
      ingredients: ingredients,
      instructions: instructions,
      posted_by: posted_by,
    };

    const userId = localStorage.getItem("user_id");
    const accountId = localStorage.getItem("account_id");

    console.log("body ===== ", body);
    axios
      .post(`/api/recipes/?userId=${userId}&accountId=${accountId}`, body)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
        navigate("/recipes");
      });
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        New Recipe
      </button>

      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">New Recipe</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <label for="recipe-name" class="col-lg-2 control-label">
                  {" "}
                  Name
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="recipe-name"
                    value={name}
                    placeholder="Enter recipe name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="recipe-image" class="col-lg-2 control-label">
                  {" "}
                  Image
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="recipe-image"
                    value={image}
                    placeholder="Enter image address"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="prepTime" class=" control-label">
                  Preparation Time
                </label>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    id="prepTime"
                    value={prepTime}
                    placeholder="Enter preparation time"
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="cookTime" class=" control-label">
                  Cooking Time
                </label>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    id="cookTime"
                    value={cookTime}
                    placeholder="Enter cooking time"
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="servings" class="control-label">
                  Serves
                </label>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    id="servings"
                    value={serving}
                    placeholder="Enter servings"
                    onChange={(e) => setServing(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="ingredients" class=" control-label">
                  Ingredients
                </label>
                <div>
                  <textarea
                    name="textarea"
                    className="form-control"
                    rows="5"
                    cols="40"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  >
                    Enter required ingredients...
                  </textarea>
                </div>
              </div>
              <div class="form-group">
                <label for="instructions" class=" control-label">
                  Instructions
                </label>
                <div>
                  {" "}
                  <textarea
                    name="textarea"
                    className="form-control"
                    rows="5"
                    cols="40"
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  >
                    Enter the instructions...
                  </textarea>
                </div>
              </div>
              <div class="form-group">
                <label for="recipe-posted_by" class="col-lg-2 control-label">
                  {" "}
                  Post by
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="recipe-posted_by"
                    value={posted_by}
                    placeholder="Enter your name"
                    onChange={(e) => setPosted_by(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                type="submit"
                data-dismiss="modal"
                onClick={(event) => onSubmitForm(event)}
              >
                Add Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
