import { React, useState } from "react";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

function App() {
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const initialArray = []
  const [chat,setChat] = useState (initialArray)
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const send = () => {
    instance
      .post("/", {
        question: question,
      })
      .then(function (response) {
        setAnswer(response.data);
        setChat( ()=> {
          chat.push({You:question, Bot:answer})
          console.log(chat);
          return chat
        })
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <textarea
        className="form-control"
        readOnly
        id="exampleFormControlTextarea1"
        rows="5"
        value= {chat.map(x=>{
          const q = x.You;
          const a = x.Bot;
          return q + "\n" + a
        })}
      >
        
      </textarea>
      <InputGroup className="mb-3">
        <FormControl
          onChange={handleChange}
          placeholder="Chat here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button onClick={send} variant="outline-secondary" id="button-addon2">
          Send
        </Button>
      </InputGroup>
    </div>
  );
}

export default App;
