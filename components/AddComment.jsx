import React, { useState, useContext } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';



const AddComment = ({ handleSubmit, setEditMode = null, comment = null, editRow = null }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState(comment ? { id: comment.id, name: comment.name, email: comment.email, body: comment.body } : { name: "", body: "", email: user.email });

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
  }
  const submit = (e) => {
    e.preventDefault();
    setEditMode && setEditMode(false);
    setEditMode && navigate(`comments`, { replace: true });
    !setEditMode && setNewComment({ name: "", body: "", email: user.email });
    handleSubmit(newComment);
  }

  return (

    <div className='addComment'>
      {comment ? <h2>Edit comment</h2> : <h2>Add new comment</h2>}
      {comment && (<p>Id:{comment.id}</p>)}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          value={newComment.name}
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          onChange={(e) => handleChange(e)}
          value={newComment.body}
        />
      </div>
      <button className="btn" onClick={(e) => submit(e)}>
        Submit
      </button>
    </div>
  );
}

export default AddComment