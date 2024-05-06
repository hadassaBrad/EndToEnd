import React from 'react'
import Todo from './Todo';
import "../css/Table.css";


const TodosTable = ({ rows, deleteRow, editRow }) => {
   
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead> 
                    <tr>
                        <th className="number">No.</th>
                        <th className="expand">Title</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        return (
                            <tr key={row.id}>
                                 <Todo todo={row} deleteRow={deleteRow} editRow={editRow}/>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TodosTable