import React from 'react'
import Post from './Post';
import "../css/Table.css";


const PostsTable = ({ rows, deleteRow, editRow, showRow }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th className="expand">Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        return (
                            <tr key={row.id}>
                                <Post row={row} deleteRow={deleteRow} editRow={editRow} showRow={showRow}/>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PostsTable