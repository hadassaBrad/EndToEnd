import React, { useState, useEffect, useContext } from "react";
import AlbumsTable from "../components/AlbumsTable";
import ModalAlbum from "../components/ModalAlbum";
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";


const Albums = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [albumsList, setAlbumsList] = useState(null);
  const [albumsListFiltered, setAlbumsListFiltered] = useState(null);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(" ");

  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    fillAlbumsListFiltered();
  }, [albumsList]);
//ע"מ לחבר לשרת נחליף את 3000 בנתון מהENV
   const getAlbums=async()=> {
    const albums = await fetch(`http://localhost:3000/albums?userId=${user.id}`)
      .then(async response => await response.json());
    setAlbumsList(albums);
  }

  const fillAlbumsListFiltered = () => {
    setAlbumsListFiltered(albumsList && albumsList.map(album => {
      return { id: album.id, title: album.title }
    }));
  }

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearch("");
    fillAlbumsListFiltered();
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    switch (searchBy) {
      case "title":
        setAlbumsListFiltered(albumsList.filter(album =>
          album.title.toLowerCase().startsWith((e.target.value).toLowerCase())
        ));
        break;
      case "id":
        setAlbumsListFiltered(albumsList.filter(album =>
          String(album.id).startsWith((e.target.value))
        ));
        break;
    }
  }

  const handleSubmit = async (title) => {
    const newRow = { userId: user.id, title: title };
    const newId = await serverPostRow(newRow);
    const album = { id: newId, ...newRow }
    setAlbumsList([...albumsList, album]);//for new row
  };


  const serverPostRow = async (album) => {
    const response = await fetch(`http://localhost:3000/albums`, {
      method: 'POST',
      body: JSON.stringify(album),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data.id;
  };
  return (

    <div className="App">
      <div className="actions">
        <div className= "filters">
          <label htmlFor="search">Search by:</label>
          <select id="search"
            value={searchBy}
            onChange={(e) => handleSearchByChange(e)}>
            <option value="title">Title</option>
            <option value="id">Id</option>
          </select>
          <input className='search' type="text" value={search} placeholder='search' onChange={(e) => (handleSearchChange(e))} />
        </div>
        <button onClick={() => setModalOpen(true)} className="btn">
          Add Album <BsPlusLg />
        </button>
      </div>
      {albumsListFiltered && (<AlbumsTable rows={albumsListFiltered} />)}

      {modalOpen && (
        <ModalAlbum
          closeModal={() => {
            navigate(`/home/users/${user.id}/albums`, { replace: true });
            setModalOpen(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={null}
        />
      )}
    </div>
  );
}

export default Albums