import axios from 'axios';
import React, {useState} from 'react';

function ListsInput () {
  //useState

  // const [user, setUser] = 

  const [description, setDescription] = useState("");
  //console.log(description);
  const [listItem, setListItem] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    //console.log({description});

    const body = ({description, listItem});

    axios.post('/api/lists', body)
    .then(res => {
      console.log(res);
    });

  };
  
  return (   
  
      
      <div className='list'>
        <h1 className='text-center'>Shopping List</h1>
        <form className='list-form d-flex my-5' >   

           <input           
          type="text" 
          placeholder='Add item' 
          className="form-control" 
          value={listItem}
          onChange={e => setListItem(e.target.value)} 
          />
          <button className="btn btn-success" type="submit" onClick={onSubmitForm}>
            Add
          </button>
        </form>
       
      </div>
      
     
     
  )
}

export default ListsInput