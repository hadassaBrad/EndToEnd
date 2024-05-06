import React from 'react'
import Comment from './Comment';
import "../css/Table.css";

const CommentsList = ({ rows,deleteRow,editRow,handleSubmit}) => {

    return (
        <div className="table-wrapper">
            <ul>
            {rows && rows.map(row => {
                        return (
                            <li key={row.id}>
                                <Comment comment={row} deleteRow={deleteRow} editRow={editRow} handleSubmit={handleSubmit} />
                            </li>
                        );
                    })}
            </ul>
        </div>
    )
}

export default CommentsList