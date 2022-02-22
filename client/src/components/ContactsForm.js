import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Button, InputGroup, FormControl, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function ContactsForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contacts, setContact] = useState([]);
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      name: name,
      phone_number: number,
      email: email,
      address: address,
    };

    const userId = localStorage.getItem("user_id");
    const accountId = localStorage.getItem("account_id");
    axios
      .post(`/api/contacts/?userId=${userId}&accountId=${accountId}`, body)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
        navigate("/contacts");
      });
  };
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        New Contact
      </button>

      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">New Contact Details</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div className="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="number">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={number}
                  placeholder="Enter contact number"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                />
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
                Add Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
