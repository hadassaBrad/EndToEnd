import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import CompleteRegisteration from './pages/CompleteRegisteration';
import Info from './pages/Info';
import Posts from './pages/Posts';
import Albums from './pages/Albums';
import Todos from './pages/Todos';
import Album from './pages/Album';
import './css/App.css'
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Navigate to="/login"/>} />
            <Route path="/logIn" element={<LogIn setUser={setUser} />} />
            <Route path="/register" element={<SignUp setUser={setUser} />} />
            <Route path="/completeRegisteration" element={<CompleteRegisteration setUser={setUser} />} />

            <Route path="/home" element={<Home setUser={setUser} />} >
              <Route path="users/:id/info" element={<Info />} />
              <Route path="users/:id/todos" element={<Todos />} />
              <Route path="users/:id/todos/:id" element={<Todos />} />
              <Route path="users/:id/posts" element={<Posts />} />
              <Route path="users/:id/posts/:id" element={<Posts />} >
                <Route path="comments" element={<Posts />} >
                  <Route path=":id" element={<Posts />} />
                </Route>
              </Route>
              <Route path="users/:id/albums" element={<Albums />} />
              <Route path="users/:id/albums/:id/photos" element={<Album/>} />
              <Route path="users/:id/albums/:id/photos/:id" element={<Album/>} />
            </Route>

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
