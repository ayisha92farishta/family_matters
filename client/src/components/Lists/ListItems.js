import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ListsItemInput from './ListItemInput';

function ListItems(props) {
  
  
  const userId = localStorage.getItem('user_id');
  const accountId = localStorage.getItem('account_id');
  const lists = props.lists

 

  //console.log("props------", lists)

  const [itemNames, setItemNames] = useState([])

  const [listId, setListId] = useState(3)
  
  const [listName, setListName] = useState('')

//function to get items
  const getItemNames = () => {    
   // console.log("making api call to get list item")
    axios.get(`/api/lists/items/?accountId=${accountId}&listId=${listId}`)
    .then(res => {
       const itemNameArray = res.data.lists;      
       setItemNames(itemNameArray)
      //console.log("item res---------", itemNameArray);
    });    
  };

  useEffect(() => {
    getItemNames();
  }, [listId])


  //function to delete a list
  const deleteItem = (id) => {
    const deleteitem = axios.delete(`/api/lists/items/${id}`)
    setItemNames(itemNames.filter(item => item.id !== id))    
   }

   //add new item function
   const addNewItem = (item) => {
     setItemNames([...itemNames,item])
   }
   //function for adding name and id to state

   const listNameAndId = (e) => {
     setListId(e.target.value);
     setListName(e.target.options[e.target.selectedIndex].text)
     
   }
  
//console.log("item names----------------------",itemNames);
  return (
    <>     
    <ListsItemInput
     listId = {listId}
     listName = {listName}
     addNewItem = {addNewItem}
    />
    <div>
      <select 
      className="form-select form-select-lg mb-3" 
      aria-label=".form-select-lg example"
      onChange={listNameAndId}
      >
      <option >Choose a list</option>
      {lists.map(list => (              
      <option key={list.id} value={list.id}>{list.name}</option>
      ))        
      }            
      </select>
    </div>
    <table className="table list-table my-5">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
         {itemNames.map(item => (
                <tr key={item.id}>
                <td>{item.item}</td>
                <td>
                <button 
              className='btn btn-danger'
              onClick={() => deleteItem(item.id)}
              >Delete</button>
                </td>
              </tr>
              )) 
            }  
      </tbody>
    </table>
  
  </>
  )
}

export default ListItems