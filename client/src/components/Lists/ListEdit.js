import React, {useState, useEffect} from 'react'

function ListEdit({list}) {
  console.log( "LIST EDIT __________",list);
  const [newName ,setNewName] = useState(list.name)
  return (
    <>
        <button 
        type="button" 
        className="btn btn-warning" data-toggle="modal" data-target={`#id${list.id}`}>
          Edit
        </button>

        <div className="modal fade" id={`id${list.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit list name</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" 
                className="form-control" 
                value={newName}
                /> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ListEdit