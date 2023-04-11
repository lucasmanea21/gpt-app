import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { supabase } from "../../../pages/api/supabase-client";
import Button from "../../Button";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { API_URL } from "../../../utils/config";

const socket = io("http://localhost:8080");

const Live = () => {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("hi!");
  const [messageReceived, setMessageReceived] = useState("");
  const [rooms, setRooms] = useState([]);

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

  useEffect(() => {
    fetchRooms();
  }, []);

  console.log("rooms", rooms);

  // todo: change to hook
  const fetchRooms = async () => {
    let data = await axios.get(`${API_URL}/rooms/public`).then((res) => {
      setRooms(res.data);
    });
  };

  console.log("messageReceived", messageReceived);

  return (
    <div>
      <Link href="/quiz/create">
        <div className="flex flex-col p-10 bg-gray-700 rounded-md">
          <p className="text-3xl">Quizzes</p>
          <div className="flex flex-wrap w-full">
            <CreateRoom />
            <Room />
            <Room />
            <Room />
          </div>
        </div>
      </Link>
      {/* <div>
        <Button onClick={() => joinRoom()}>Join Room</Button>
        <Button onClick={() => sendMessage()}>Send message</Button>
      </div>
      <div className="text-lg">
        <p>Message received: {messageReceived}</p>
      </div> */}
    </div>
  );
};

export default Live;
