import React from 'react'
import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";


const Post = ({row,deleteRow,editRow,showRow}) => {

    return (
        <>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td className="fit">
                <span className="actions">
                    <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(row.id)}
                    />
                    <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(row.id)}
                    />
                    <BsFillEyeFill
                        className="show-btn"
                        onClick={() => showRow(row.id)}
                    />
                </span>
            </td>
        </>
    )
}

export default Post