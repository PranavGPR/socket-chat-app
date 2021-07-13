import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const id = nanoid(4);

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, id });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chatty app</h1>
      </header>
      <main>
        <div className='chatContainer'>
          {chat.map((value, index) => {
            return (
              <div className='chatWrapper' key={index}>
                <span>{value.id}</span>
                <p>{value.message}</p>
              </div>
            );
          })}
        </div>
      </main>
      <footer>
        <form onSubmit={sendChat}>
          <input
            type='text'
            name='chat'
            placeholder='Your text goes here...'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type='submit'>Send</button>
        </form>
      </footer>
    </div>
  );
}
