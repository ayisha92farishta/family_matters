import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function ListsInput () {
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  const [itemName, setItemName] = useState("");
  const onSubmitForm = (e) => {
    e.preventDefault();    
    const body = {
      item_name : itemName,
      list_id : '1',
      user_id : userId
    };
    //post request to insert new item in List_items table    
    axios.post(`/api/lists/items`, body)
    console.log("API LINK IS HITTING")
    .then(response => {
      console.log("ITEM RESPONSE",response.data);
      navigate('/item');
    })
  };  
  return (      
    <div className='list'>
      <h1 className='text-center'>Shopping List</h1>
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

export default ListsInput