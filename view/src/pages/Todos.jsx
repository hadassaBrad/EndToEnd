import React, { useState, useEffect, useContext } from "react";
import TodosTable from "../components/TodosTable";
import ModalTodo from "../components/ModalTodo";
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";

const Todos = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [todosList, setTodosList] = useState(null);
  const [todosListFiltered, setTodosListFiltered] = useState(null);
  const [sortBy, setSortBy] = useState(" ");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(" ");
  const [searchExecution, setSearchExecution] = useState(" ");

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    fillTodosListFiltered();
  }, [todosList]);


   const getTodos=async()=> {
    const todos = await fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(async response => await response.json());
    setTodosList(todos);
  }

  const fillTodosListFiltered = () => {
    setTodosListFiltered(todosList && todosList.map(todo => {
      return { id: todo.id, title: todo.title, completed: todo.completed }
    }));
  }

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    switch (e.target.value) {
      case "sequential":
        setTodosListFiltered(todosListFiltered.sort((a, b) => a.id - b.id));
        break;
      case "Execution of":
        setTodosListFiltered(todosListFiltered.sort((a, b) => a.completed - b.completed));
        break;
      case "alphabetical":
        setTodosListFiltered(todosListFiltered.sort((a, b) => a.title < b.title ? -1 : 1));
        break;
      case "random":
        setTodosListFiltered(todosListFiltered.sort(() => Math.random() - 0.5));
        break;
    }
  }

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearch("");
    fillTodosListFiltered();
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    switch (searchBy) {
      case "title":
        setTodosListFiltered(todosList.filter(todo =>
          todo.title.toLowerCase().startsWith((e.target.value).toLowerCase())
        ));
        break;
      case "id":
        setTodosListFiltered(todosList.filter(todo =>
          String(todo.id).startsWith((e.target.value))
        ));
        break;
    }
  }
  const handleExecutionChange = (e) => {
    setSearchExecution(e.target.value);
    e.target.value == "completed" ?
      setTodosListFiltered(todosList.filter(todo => todo.completed == true)) :
      setTodosListFiltered(todosList.filter(todo => todo.completed == false));
  }

  const handleDeleteRow = (idDelete) => {
    if (confirm("Are you sure you want to delete?")) {
      fetch(`http://localhost:3000/todos/${idDelete}`, {
        method: 'DELETE',
      });
      setTodosListFiltered(todosListFiltered.filter(todo => todo.id !== idDelete));
    }
  };

  const handleEditRow = (idEdit) => {
    navigate(`${idEdit}`, { replace: true });
    setRowToEdit(idEdit);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      newRow = { userId: user.id, ...newRow };
      const newId = await serverPostRow(newRow);
      const todo = { id: newId, ...newRow }
      setTodosList([...todosListFiltered, todo]);//for new row
    }
    else {
      const todo = { userId: user.id, ...newRow }
      serverPutRow(todo);
      setTodosList(
        todosListFiltered.map(currRow => {
          if (currRow.id !== rowToEdit)
            return currRow;
          return newRow;
        })
      );
    }
  };

  const serverPutRow = (todo) => {
    const putRequest =
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
  };

   const serverPostRow=async(todo)=> {
    const response = await fetch(`http://localhost:3000/todos`, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data.id;
  };

  return (
    <>
      <div className="actions">
        <div className="filters">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort"
            value={sortBy}
            onChange={(e) => handleSortByChange(e)}
          >
            <option value="sequential">Sequential</option>
            <option value="Execution of">Execution of</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="random">Random</option>
          </select>
        </div>

        <div className="filters">
          <label htmlFor="search">Search by: </label>
          <select id="search"
            value={searchBy}
            onChange={(e) => handleSearchByChange(e)}>
            <option value="title">Title</option>
            <option value="execution">Execution</option>
            <option value="id">Id</option>
          </select>

          {searchBy != "execution" && 
          (<input className='search' type="text" value={search} placeholder='search' onChange={(e) => (handleSearchChange(e))} />)}
          {searchBy == "execution" && (
            <select
              value={searchExecution}
              onChange={(e) => handleExecutionChange(e)}
            >
              <option value="" >
                --Choose and option--
              </option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>)}</div>
            
        <button onClick={() => setModalOpen(true)} className="btn">
          Add Todo <BsPlusLg />
        </button>
      </div>
      {todosListFiltered && (<TodosTable rows={todosListFiltered} deleteRow={handleDeleteRow} editRow={handleEditRow} />)}

      {modalOpen && (
        <ModalTodo
          closeModal={() => {
            navigate(`/home/users/${user.id}/todos`, { replace: true });
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && todosList.filter(row => row.id == rowToEdit ? row : null)[0]}
        />
      )}
    </>
  );
}

export default Todos