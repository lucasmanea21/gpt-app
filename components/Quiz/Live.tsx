import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Button from "../Button";

const socket = io("http://localhost:8080");

const Live = () => {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("hi!");
  const [messageReceived, setMessageReceived] = useState("");

  console.log("socket", socket);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  console.log("messageReceived", messageReceived);

  return (
    <div>
      <div>
        <Button onClick={() => joinRoom()}>Join Room</Button>
        <Button onClick={() => sendMessage()}>Send message</Button>
      </div>
      <div className="text-lg">
        <p>Message received: {messageReceived}</p>
      </div>
    </div>
  );
};

export default Live;
