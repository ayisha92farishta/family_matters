import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewMember() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };

    const accountId = localStorage.getItem("account_id");

    console.log("body ===== ", body);
    axios
      .post(`/api/add_member/?accountId=${accountId}`, body)
      .then((response) => {
        console.log(response.data);
        navigate("/family");
      });
  };
  return (
    <div>
      <div class="container"></div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add New Member
      </button>

      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">New Member Details</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <label for="first_name" class="control-label">
                  First Name
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    value={first_name}
                    placeholder="Enter first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="last_name" class=" control-label">
                  Last Name
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    value={last_name}
                    placeholder="Enter last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="email" class=" control-label">
                  Email
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    placeholder="Enter email of the new member"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="password" class="control-label">
                  Temporary Password
                </label>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    placeholder="Enter a temporary password"
                    onChange={(e) => setPassword(e.target.value)}
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
