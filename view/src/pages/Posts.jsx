import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../App';
import PostsTable from "../components/PostsTable";
import ModalPost from "../components/ModalPost";
import { useNavigate } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";

const Posts = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [postsList, setPostsList] = useState(null);
  const [postsListFiltered, setPostsListFiltered] = useState(null);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [showRow, setShowRow] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    fillPostsListFiltered();
  }, [postsList]);

  const getPosts = async () => {
    const posts = await fetch(`http://localhost:7787/posts?user_id=${user.id}`)
      .then(async response => await response.json());
    setPostsList(posts);
  }

  const fillPostsListFiltered = () => {
    setPostsListFiltered(postsList && postsList.map(post => {
      return { id: post.id, title: post.title }
    }));
  }

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearch("");
    fillPostsListFiltered();
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    switch (searchBy) {
      case "title":
        setPostsListFiltered(postsList.filter(post =>
          post.title.toLowerCase().startsWith((e.target.value).toLowerCase())
        ));
        break;
      case "id":
        setPostsListFiltered(postsList.filter(post =>
          String(post.id).startsWith((e.target.value))
        ));
        break;
    }
  }

  const handleDeleteRow = (idDelete) => {
    if (confirm("Are you sure you want to delete?")) {
      setPostsList(postsList.filter(post => post.id !== idDelete));
      fetch(`http://localhost:7787/posts/${idDelete}`, {
        method: 'DELETE',
      });
    }
  };

  const handleEditRow = (idEdit) => {
    navigate(`${idEdit}`, { replace: true });
    setRowToEdit(idEdit);
    setModalOpen(true);
  };

  const handleShowRow = (idShow) => {
    navigate(`${idShow}`, { replace: true });
    setShowRow(true);
    setRowToEdit(idShow);
    setModalOpen(true);
  }

  async function handleSubmit(newRow) {
    if (rowToEdit === null) {
      newRow = { user_id: user.id, ...newRow };
      const newId = await serverPostRow(newRow);
      const post = { userId: user.id, id: newId, ...newRow }
      setPostsList([...postsList, post]);//change the source and change the filtered by useeffect
    }
    else {
      const post = { user_id: user.id, ...newRow }
      setPostsList(
        postsList.map(currRow => {
          if (currRow.id !== rowToEdit)
            return currRow;
          return newRow;
        })
      );
      serverPutRow(post);
    }
  };

  const serverPutRow = (post) => {
    const putRequest =
      fetch(`http://localhost:7787/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
  };

  async function serverPostRow(post) {
    const response = await fetch(`http://localhost:7787/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data.insertId;
  };


  return (
    <>
      <div className="actions">

        <div className="filters">
          <label htmlFor="search">Search by: </label>
          <select id="search"
            value={searchBy}
            onChange={(e) => handleSearchByChange(e)}>
            <option value="title">Title</option>
            <option value="id">Id</option>
          </select>
          <input className='search' type="text" value={search} placeholder='search' onChange={(e) => (handleSearchChange(e))} />
        </div>
        <button onClick={() => setModalOpen(true)} className="btn">
          Add Post <BsPlusLg />
        </button>
      </div>
      
      {postsListFiltered && (<PostsTable rows={postsListFiltered} deleteRow={handleDeleteRow} editRow={handleEditRow} showRow={handleShowRow} />)}

      {modalOpen && (
        <ModalPost
          disabled={showRow}
          closeModal={() => {
            navigate(`/home/users/${user.id}/posts`, { replace: true });
            setModalOpen(false);
            setRowToEdit(null);
            setShowRow(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit}
        />
      )}
    </>
  );
}

export default Posts