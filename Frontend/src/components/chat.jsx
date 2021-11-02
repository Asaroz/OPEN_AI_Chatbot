import { React, useState } from "react";
import axios from "axios";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./chat.css";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

function Chat(props) {
  const token = props.token
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const initialArray = [];
  const [chat, setChat] = useState(initialArray);
  const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const send = (e) => {
    e.preventDefault();
    instance
      .post("/", {
        question: question,
        token:token
      })
      .then(function (response) {
        console.log(response.data);
        // setAnswer(response.data);
        setChat(() => {
          chat.push({ You: "You: " + question, Bot: response.data });
          console.log(chat);
          return chat;
        });
        setQuestion("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [mood, setMood] = useState("");
  const handleMood = (e) => {
    console.log(e);
    setMood(e);
    
  };

  return (
    <div>
      <DropdownButton variant="info" title="Select the Robot's mood" onSelect={handleMood}>
        <Dropdown.Item className="dropdown" eventKey="happy">Happy and likes humans</Dropdown.Item>
        <Dropdown.Item eventKey="rude">Rude and dislikes humans</Dropdown.Item>
        <Dropdown.Item eventKey="robotic">A robotic robot</Dropdown.Item>
      </DropdownButton>

      <textarea
        className="form-control"
        className="chatbox"
        readOnly
        rows="20"
        value= {chat.map(x=>{
            const q = x.You;
            const a = x.Bot;
            return q + "\n" + a +"\n"}).join("")
      }
      >
        
      </textarea>
      <Form className="mb-3" onSubmit={send}>
        <FormControl
          onChange={handleChange}
          placeholder="Chat here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={question}
        />
        <Button
          className="button"
          type="submit"
          variant="outline-secondary"
          id="button-addon2"
        >
          Send
        </Button>
      </Form>
    </div>
  );
}

export default Chat;
