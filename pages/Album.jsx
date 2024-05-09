import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import ModalPhoto from '../components/ModalPhoto';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { BsPlusLg } from "react-icons/bs";

const Album = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  let { id } = useParams();
  const [rowToEdit, setRowToEdit] = useState(null);
  const [photosList, setPhotosList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const photosf = await fetch(`http://localhost:3000/photos?_limit=10&_page=1&albumId=${id}`)
      .then(async response => await response.json())
    setPhotosList(photosf);
  }

  const fetchMoreData = async () => {
    try {
      const photos = await fetch(`http://localhost:3000/photos?_limit=10&_page=${page}&albumId=${id}`)
        .then(async response => await response.json())
      setPhotosList(prev => [...prev, ...photos]);
      photos.length > 0 ? setHasMore(true) : setHasMore(false);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError(error);
    }
  };

  const deletePhoto = (idDelete) => {
    if (confirm("Are you sure you want to delete?")) {
      setPhotosList(photosList.filter(photo => photo.id !== idDelete));
      fetch(`http://localhost:3000/photos/${idDelete}`, {
        method: 'DELETE',
      });
    }
  };

  const editPhoto = (idEdit) => {
    navigate(`${idEdit}`, { replace: true });
    setRowToEdit(idEdit);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      newRow = { albumId: id, ...newRow };
      const newId = await serverPostRow(newRow);
      const photo = { id: newId, ...newRow }
      setPhotosList([...photosList, photo]);//for new row
    }
    else {
      const photo = { userId: user.id, ...newRow }
      setPhotosList(
        photosList.map(currRow => {
          if (currRow.id !== rowToEdit)
            return currRow;
          return newRow;
        })
      );
      serverPutRow(photo);
    }
  };

  const serverPutRow = (photo) => {
    fetch(`http://localhost:3000/photos/${photo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
  };

  const serverPostRow = async (photo) => {
    const response = await fetch(`http://localhost:3000/photos`, {
      method: 'POST',
      body: JSON.stringify(photo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.id;
  };


  return (
    <div>
      <h2>Album: {id}</h2>
      <button onClick={() => setModalOpen(true)} className="btn btnPhoto">
        Add Photo <BsPlusLg />
      </button>

      <InfiniteScroll 
        className='infiniteScroll'
        dataLength={photosList && photosList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p className='finishLoading'> No more data to load.</p>}
      >

        {photosList && (<div className='grid-container'>
          {photosList.map(item => (
            <div className='photo' key={item.title}>

              <img className='photoImg' src={item.thumbnailUrl} alt={item.title} />
              <p>{item.title}
              </p>
              <span>
                <BsFillTrashFill
                  className="delete-btn icon"
                  onClick={() => deletePhoto(item.id)}
                />
                <BsFillPencilFill
                  className="edit-btn icon"
                  onClick={() => editPhoto(item.id)}
                /></span>
            </div>

          ))}
        </div>)}

        {modalOpen && (
          <ModalPhoto
            closeModal={() => {
              navigate(`/home/users/${user.id}/albums/${id}/photos`, { replace: true });
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && photosList.filter(row => row.id == rowToEdit ? row : null)[0]}
          />
        )}
      </InfiniteScroll>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default Album