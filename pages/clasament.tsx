import React from "react";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import SectionWrapper from "../components/Wrappers";
import useGetUserData from "../hooks/useGetUserData";

const Clasament = () => {
  useGetUserData();

  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex justify-center">
        <SectionWrapper>
          <Leaderboard />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default Clasament;
