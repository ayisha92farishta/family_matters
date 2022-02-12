import React from 'react'

const List_form = () => {
  return(
  <><h1>Form Name</h1>
    <form className='list_form'>
      

      <input type="text" className="todo-input" />
      <button className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form></>
  )
}
export default List_form

