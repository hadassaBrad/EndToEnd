import React, { useContext, createContext } from 'react'
import { Outlet } from "react-router-dom"
import { UserContext } from '../App';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const Home = ({ setUser }) => {
  const user = useContext(UserContext);
  const location = useLocation();

  return (
    <>
      {user && (<>
        <Header setUser={setUser} />
        {location.pathname == '/home' &&
          (<h2 className='welcome'>{`Welcome ${user.name}!`}</h2>)}
        <Outlet />
      </>)}
    </>
  )
}

export default Home