import React, { useState } from "react";
import Chat from "./chat";
import Login from "./login";
import './app.css'

function App() {

const [user,setUser]= useState()
const [token, setToken]= useState("");
  
    return (
        <div className="wrapper">
        <h1>ChatBot</h1>
        {user ?
          <Chat token={token} />
        :
          <Login setToken={setToken} setUser={setUser} />
        }
      </div>
    ); 
  }
  
  export default App;