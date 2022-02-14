import axios from 'axios';
import React, {useState} from 'react';

function ListsInput () {
  //useState
  const [description, setDescription] = useState("");
  console.log(description);

  const onSubmitForm = (e) => {
    e.PreventDefault();
    
    const body = {description};

    axios.post('/api/lists', body)
    .then(res => {
      console.log(res);
    });

  };
  
  return (   
  
      
      <div className='list'>
        <h1 className='text-center'>Shopping List</h1>
        <form className='list-form d-flex my-5' onSubmit={onSubmitForm}>   

          <input           
          type="text" 
          placeholder='Add item' 
          className="form-control" 
          value={description}
          onChange={e => setDescription(e.target.value)} 
          />
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </form>
       
      </div>
      
     
     
  )
}

export default ListsInput