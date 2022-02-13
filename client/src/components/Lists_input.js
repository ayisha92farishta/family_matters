import React, {useState} from 'react'

function Lists_input() {
    const [description, setDescription] = useState("");
  console.log(description);
  const onSubmitForm = async e => {
    e.PreventDefault();
    try{
      const body = {description};
      await fetch
    } catch (err) {
      console.error(err.message);
    }
  }
  
  return (   
  
      <div className='lists'>
      <div className='saved-lists my-5'>
        <h1>The lists that exists</h1>
      </div>
      <div className='new-list'>
        <h1 className='text-center my-5'>Shopping List</h1>
        <form className='list-form d-flex' onSubmit={onSubmitForm}>   

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
      
      </div>
     
  )
}

export default Lists_input