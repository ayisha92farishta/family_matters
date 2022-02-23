import React, {useState, useEffect} from 'react'
import axios from 'axios';


function ListNew() {
   
  const [newList, setNewList] = useState('');  
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');



  const onSubmitForm = (e) => {
    e.preventDefault();
    const body = ({newList});
    //post request to insert new item in Lists and user_lists table
    axios.post(`/api/lists/?userId=${userId}&accountId=${accountId}`, body)
    .then(res => {
   // console.log('newlists------------',res); 
      
    });   
    setNewList("") 
  };

  return (
  <>
    <div className='list'>
      <h3 className='text-center'>Add a new list</h3>
      <form className='list-input d-flex my-5' >   
      <input           
        type="text" 
        name='new_list'
        placeholder='Add a new list' 
        className="form-control" 
        value={newList}
        onChange={e => setNewList(e.target.value)} 
      />
      <button className="btn btn-success" type="submit" onClick={onSubmitForm}>
        Add
      </button>
      </form> 
    </div>
  </>    
  )
}

export default ListNew