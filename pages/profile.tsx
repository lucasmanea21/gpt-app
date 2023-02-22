import { useAtom } from "jotai";
import React from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile/Profile";
import useGetUserData from "../hooks/useGetUserData";
import { userInfoAtom, userSessionAtom } from "../store/atom";

const ProfilePage = () => {
  useGetUserData();
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
