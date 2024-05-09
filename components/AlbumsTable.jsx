import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App';

import "../css/Table.css";



const AlbumsTable = ({ rows }) => {
    const user = useContext(UserContext);
    return (
        <div className="table-wrapper">
            <table className="table albums">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th className="expand">Title</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        return (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td> <Link
                                    to={`/home/users/${user.id}/albums/${row.id}/photos`}
                                >{row.title}</Link></td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AlbumsTable