import React, { useState, useEffect } from "react";
import {
  getQuiz,
  getUsersByPoints,
} from "../../pages/api/supabase/supabase-client";
import { LeaderboardUser } from "../../types";
import Card from "../Cards";
import Item from "./Item";

const Leaderboard = () => {
  const [users, setUsers] = useState<any>([]);

  const getUsers = async () => {
    const { data, error } = await getUsersByPoints();
    // transform data to match the LeaderboardUser type
    setUsers(
      data?.map((user, index) => {
        return {
          name: user?.full_name,
          points: user?.points,
          id: user?.id,
          avatar_url: user?.avatar_url,
          rank: index + 1,
        };
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Card>
      <div className="mb-8">
        <p className="mb-2 text-4xl">Clasament</p>
        <p className="text-md">Castiga puncte si califica-te in clasament.</p>
      </div>
      <div className="flex flex-col">
        {users?.map((user: LeaderboardUser, index: number) => {
          return <Item key={index} user={user} />;
        })}
      </div>
    </Card>
  );
};

export default Leaderboard;
