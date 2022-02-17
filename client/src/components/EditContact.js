import React, { Fragment, useState} from 'react';

function EditContact(props) {
  const contact = props.contact;
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.phone_number);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);

  const updateContact = (event) => {
    event.preventDefault();
    const body = {
      id: contact.id,
      name : name,
      phone_number : number,
      email : email,
      address : address
    };

    props.updateContact(body);
  }
  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${contact.id}`}>
        Update
      </button>

      <div className="modal fade" id={`id${contact.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Update Contact</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div>
              <label for="name">Name</label>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
              <label for="number">Phone Number</label>
              <input type="number" className="form-control" value={number} onChange={e => setNumber(e.target.value)}/>
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
              <label for="address">Address</label>
              <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)}/>
            </div>
            
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={event => updateContact(event)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  )
}

export default EditContact