import React from "react";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/navbar";
import SectionWrapper from "../components/Wrappers";
import useGetUserData from "../hooks/useGetUserData";

const Clasament = () => {
  useGetUserData();

  return (
    <div>
      <Navbar />
      <h1>Clasament</h1>

      <div className="flex justify-center">
        <SectionWrapper>
          <Leaderboard />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default Clasament;
