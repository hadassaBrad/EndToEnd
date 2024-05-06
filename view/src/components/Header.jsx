import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App';
import { BsPersonCircle } from "react-icons/bs";
import "../css/nav.css";

const Header = ({ setUser }) => {
  const user = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  }

  return (
    <nav className='header'>
      <div>
        <BsPersonCircle className="svg" />
        <div className='userName'>{user.name}</div>
      </div>

      <Link to={`/home/users/${user.id}/info`}
      >
        Info
      </Link>
      <Link to={`/home/users/${user.id}/todos`}
      >
        Todos
      </Link>
      <Link to={`/home/users/${user.id}/posts`}
      >
        Posts
      </Link>
      <Link to={`/home/users/${user.id}/albums`}
      >
        Albums
      </Link>
      <Link onClick={logOut} to="/login"
      >
        Log out
      </Link>
    </nav>
  )
}

export default Header