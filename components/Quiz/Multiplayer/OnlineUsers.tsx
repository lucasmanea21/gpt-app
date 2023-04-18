import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/config";

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  console.log("onlineUsers", onlineUsers);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      axios
        .get(`${API_URL}/users/online_count`)
        .then((res) => setOnlineUsers(res.data.onlineUsers));

      //   console.log("data", data);
      //   setOnlineUsers(data.onlineUsers);
    };

    fetchOnlineUsers();

    // Fetch the online user count every 1 minute
    const interval = setInterval(fetchOnlineUsers, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="online-users-card">
      <p>Online Users: {onlineUsers}</p>
    </div>
  );
};

export default OnlineUsers;
