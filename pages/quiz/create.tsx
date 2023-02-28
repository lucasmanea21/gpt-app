import React from "react";
import Button from "../../components/Button";
import Card from "../../components/Cards";
import Navbar from "../../components/Navbar";
import Chooser from "../../components/Quiz/Chooser";
import Create from "../../components/Quiz/Create";
import SectionWrapper from "../../components/Wrappers";
import useGetUserData from "../../hooks/useGetUserData";

const CreatePage = () => {
  useGetUserData();

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <SectionWrapper>
          <Create />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default CreatePage;
