
import { React } from 'react'
import "./App.css"
import io from 'socket.io-client'
import Chat from './chat'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './login';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
 const socket =io.connect("http://localhost:3001");


 export const Appcontext=createContext(null)
function App(){
  
  const [username,setUsername]=useState('')
 const [room,setRoom]=useState('')
// let username = ""
// let room = ""

const setCredentials = (user, roomID)=>{
  console.log(`Changing the values to ${user}, ${roomID}`)
  setRoom(roomID)
  setUsername(user)
}
  return (
    <Appcontext.Provider value={{username,room, setCredentials}}>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Login/>}/>
      <Route path={'/chat'} element={<Chat socket={socket} username={username} room={room}/>}/>




    </Routes>
   
    </BrowserRouter>
    </Appcontext.Provider>
   
  );
}

export default App;
