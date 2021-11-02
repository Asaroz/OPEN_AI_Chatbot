import { React, useState, useRef, useEffect } from "react";
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
  const token = props.token;
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const initialArray = [];
  const [chat, setChat] = useState(initialArray);
  const [question, setQuestion] = useState("");
  const [currentMood, setCurrentMood] = useState("Happy Bot");

  const send = (e) => {
    e.preventDefault();
    instance
      .post("/", {
        question: question,
        token: token,
        mood: mood,
      })
      .then(function (response) {
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

  const [mood, setMood] = useState("happy and likes humans");
  const handleMood = (e) => {
    setMood(e);
  };
  const handleCurrentMood = (e) => {
    if (e == "happy and likes humans") {
      setCurrentMood("Happy Bot");
    } else if (e == "rude and dislikes humans") {
      setCurrentMood("Rude Bot");
    } else if (e == "crazy and thinks its a wizard") {
      setCurrentMood("Crazy Wizard Bot");
    }
  };
  const textArea = useRef();
  useEffect(() => {
    const area = textArea.current;
    area.scrollTop = area.scrollHeight;
  });

  return (
    <div className= "chatWrap">
      <DropdownButton
        variant="dark"
        title="Robot's mood"
        onSelect={(e) => {
          handleMood(e);
          handleCurrentMood(e);
        }}
      >
        <Dropdown.Item className="dropdown" eventKey="happy and likes humans">
          Happy
        </Dropdown.Item>
        <Dropdown.Item eventKey="rude and dislikes humans">Rude</Dropdown.Item>
        <Dropdown.Item eventKey="crazy and thinks its a wizard">
          Crazy Wizard
        </Dropdown.Item>
      </DropdownButton>
      <div>Current mood: {currentMood}</div>
      <textarea
        ref={textArea}
        className="form-control"
        className="chatbox"
        readOnly
        rows="10"
        value={chat
          .map((x) => {
            const q = x.You;
            const a = x.Bot;
            return q + "\n" + a + "\n";
          })
          .join("")}
      ></textarea>
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
