import axios from 'axios';
import React, {useState} from 'react';

function ListsItemInput () {
  const userId = localStorage.getItem('user_id');
  const [itemName, setItemName] = useState("");
  const onSubmitForm = (e) => {
    e.preventDefault();    
    const body = {
      item_name : itemName,
      list_id : '3',
      user_id : userId
    };
    //post request to insert new item in List_items table    
    axios.post(`/api/lists/items`, body)
    .then(response => {
      console.log("ITEM RESPONSE",response.data);
    })
  };  
  return (      
    <div className='list'>
      <h1 className='text-center'>Shopping </h1>
      <form className='list-form d-flex my-5' >   
        <input           
        type="text" 
        placeholder='Add item' 
        className="form-control" 
        value={itemName}
        onChange={e => setItemName(e.target.value)} 
        />
        <button className="btn btn-success" type="submit" onClick={onSubmitForm} >
          Add
        </button>
      </form>       
    </div>        
  )
}

export default ListsItemInput