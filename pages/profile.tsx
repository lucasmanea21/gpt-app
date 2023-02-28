import { useAtom } from "jotai";
import React from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile/Profile";
import Welcome from "../components/Welcome";
import useGetUserData from "../hooks/useGetUserData";
import { userInfoAtom, userSessionAtom } from "../store/atom";

const ProfilePage = () => {
  const [session] = useAtom(userSessionAtom);

  useGetUserData();

  return (
    <div>
      <Navbar />
      {session ? (
        <div className="flex justify-center">
          <Profile />
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default ProfilePage;
