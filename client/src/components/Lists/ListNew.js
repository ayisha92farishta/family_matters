import React, {useState, useEffect} from 'react'
import axios from 'axios';

function ListNew() {
     //useState
     
     const [newList, setNewList] = useState("");
     //console.log(description);
      
      //getting account and userid from local storage
      const userId = localStorage.getItem('user_id');
      const accountId = localStorage.getItem('account_id');

      console.log('userid------>', userId, 'Account id', accountId)

      const onSubmitForm = (e) => {
       e.preventDefault();
       //console.log({description});
   
       const body = ({newList});
   
       axios.post(`/api/lists/?userId=${userId}&accountId=${accountId}`, body)
       .then(res => {
         console.log('newlists------------',res);
       });   
     };
  return (
    <>
    <div className='list'>
    <h1 className='text-center'>Add a new list</h1>
    <form className='list-form d-flex my-5' >   

       <input           
      type="text" 
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