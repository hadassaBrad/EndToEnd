import React, { useContext, useState } from 'react'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { UserContext } from '../App';
import AddComment from './AddComment';

const Comment = ({ comment, editRow, deleteRow,handleSubmit }) => {
    const user = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);

    const edit=()=>{
        setEditMode(true);
        editRow(comment.id);
    }
    return (
        <>
        { !editMode?
            (<div>
                <p> {comment.id}</p>
                <p> {comment.name}</p>
                <div> {comment.body}</div>
                { user.email == comment.email && (<div className="fit">
            <span className="actions">
                <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => deleteRow(comment.id)}
                />
                <BsFillPencilFill
                    className="edit-btn"
                    onClick={edit}
                />
            </span>
        </div>)}
            </div > 
        ): (<AddComment handleSubmit={handleSubmit} setEditMode={setEditMode} comment={comment} editRow={editRow} />)} 
        </>
    )
}

export default Comment