import React, { useState, useEffect } from 'react'
import CommentsList from './CommentsList';
import { useNavigate } from 'react-router-dom';
import AddComment from './AddComment';

const Comments = ({ postId }) => {
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState(null);
  const [commentListFiltered, setCommentListFiltered] = useState(null);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    fillCommentListFiltered();
  }, [commentList]);

  const getComments = async () => {
    const comments = await fetch(`http://localhost:7787/comments?post_id=${postId}`)
      .then(async response => await response.json());
    setCommentList(comments);
  }

  const fillCommentListFiltered = () => {
    setCommentListFiltered(commentList && commentList.map(comment => {
      return { id: comment.id, name: comment.name, email: comment.email, body: comment.body }
    }));
  }

  const handleDeleteRow = (idDelete) => {
    if (confirm("Are you sure you want to delete?")) {
      setCommentListFiltered(commentListFiltered.filter(comment => comment.id !== idDelete));
      fetch(`http://localhost:7787/comments/${idDelete}`, {
        method: 'DELETE',
      });
    }
  };

  const handleEditRow = (idEdit) => {
    navigate(`comments/${idEdit}`, { replace: true });
  };

  const handleSubmit = (newRow) => {
    if (!newRow.id) {
      newRow = { postId: postId, ...newRow };
      serverPostRow(newRow).then(data => {
        const id = data.insertId;
        const comment = { id, ...newRow }
        setCommentListFiltered([...commentListFiltered, comment]);//for new row
      });

    }
    else {
      const comment = { postId: postId, ...newRow }
      setCommentListFiltered(
        commentList.map(currRow => {
          if (currRow.id !== newRow.id)
            return currRow;
          return newRow;
        })
      );
      serverPutRow(comment);
    }
  };

  const serverPutRow = (comment) => {
    fetch(`http://localhost:7787/comments/${comment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });
  };

  const serverPostRow = (comment) => {
    return fetch('http://localhost:7787/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json());
  };


  return (
    <div>
      <AddComment handleSubmit={handleSubmit} />
      <h2>Comments:</h2>
      {commentListFiltered &&
        (<CommentsList
          rows={commentListFiltered}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
          handleSubmit={handleSubmit} />)}
    </div>
  )
}

export default Comments