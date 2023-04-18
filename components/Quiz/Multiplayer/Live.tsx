import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { supabase } from "../../../pages/api/supabase-client";
import Button from "../../Button";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { API_URL } from "../../../utils/config";
import OnlineUsers from "./OnlineUsers";
import { useAtom } from "jotai";
import { userInfoAtom, userSessionAtom } from "../../../store/atom";

const socket = io("http://localhost:8080");

const Live = () => {
  const [userInfo] = useAtom(userInfoAtom);
  const [session] = useAtom(userSessionAtom);

  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("hi!");
  const [messageReceived, setMessageReceived] = useState("");
  const [rooms, setRooms] = useState([]);

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
    fetchRooms(session);
  }, [session]);

  console.log("rooms", rooms);

  const updateUserActivity = async (userId: string) => {
    try {
      // todo: modify to axios
      const response = await fetch(`${API_URL}/users/update_activity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user activity");
      }
    } catch (error: any) {
      console.error("error", error.message);
    }
  };

  // todo: change to hook
  const fetchRooms = async (session: any) => {
    let data = await axios.get(`${API_URL}/rooms/public`).then((res) => {
      console.log("ran");
      session.user && session.user.id && updateUserActivity(session.user.id);
      setRooms(res.data);
    });
  };

  console.log("session", session);

  console.log("messageReceived", messageReceived);

  return (
    <div>
      <Link href="/quiz/create">
        <div className="flex flex-col p-10 bg-gray-700 rounded-md">
          <OnlineUsers />
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
