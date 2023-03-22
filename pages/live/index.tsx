import React from "react";
import Card from "../../components/Cards";
import Navbar from "../../components/Navbar";
import Live from "../../components/Quiz/Multiplayer/Live";
import SectionWrapper from "../../components/Wrappers";
import useGetUserData from "../../hooks/useGetUserData";

const LivePage = () => {
  useGetUserData();
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <SectionWrapper>
          <Card>
            <Live />
          </Card>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default LivePage;
