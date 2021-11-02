import React, { useState } from "react";
import axios from "axios";
import './login.css';


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = props.setUser

  const axiosE = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 10000,
    headers: { "X-Custom-Header": "foobar" },
  });

  function handleSubmit(e) {
    e.preventDefault();
    axiosE
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if(response.data.succes){
          setUser(response.data.user)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleRegister(){
  axiosE.post("/register", {
    email: email,
    password: password,
  })
  .then((response) => {
    console.log(response);
    if(response.data.succes){
      setUser(response.data.user)
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button className="button" type="submit">Login</button>
        <button className="button" type="register" onClick={handleRegister}>Register</button>
      </div>
    </form>
  );
}
