import React from 'react'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const Todo = ({ todo,editRow, deleteRow }) => {
    return (
        <>
            <td className='number'>{todo.id}</td>
            <td className='expand'>{todo.title}</td>
            <td><input 
            className='checkbox'
                type="checkbox"
                checked={todo.completed == true ? true : false}
                readOnly
            /></td>
            <td className="fit">
                <span className="actions">
                    <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(todo.id)}
                    />
                    <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(todo.id)}
                    />
                </span>
            </td>
        </>
    )
}

export default Todo