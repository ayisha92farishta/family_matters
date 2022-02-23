import axios from 'axios';
import React, {useState} from 'react';

function ListsItemInput (props) {
  //console.log("Props ID______________", props.listId)
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id')
  const [itemName, setItemName] = useState("");
  const onSubmitForm = (e) => {
    e.preventDefault();    
    const body = {
      item_name : itemName,
      list_id : props.listId,
      user_id : userId,
      account_id : accountId
    };
    //post request to insert new item in List_items table    
    axios.post(`/api/lists/items`, body)
    .then(response => {
      //console.log("ITEM RESPONSE",response.data);
      props.addNewItem({
        id : response.data.id,
        name : props.listName,
        item : itemName
      })
    })
  };  
  return (      
    <div className='list'>
      <h4 className='text-center'>{props.listName} </h4>
      <form className='list-input d-flex my-5' >   
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