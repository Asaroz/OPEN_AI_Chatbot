import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from "./chat";
import Login from "./login";

function App() {

const [user,setUser]= useState()
  console.log(user)
    return (
        <div className="wrapper">
        <h1>ChatBot</h1>
        {user ?
          <Chat user={user} />
        :
          <Login setUser={setUser} />
        }
      </div>
    ); 
  }
  
  export default App;