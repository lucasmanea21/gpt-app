import React from "react";
import Card from "../../components/Cards";
import Navbar from "../../components/Navbar";
import Quiz from "../../components/Quiz/Multiplayer/Quiz";
import SectionWrapper from "../../components/Wrappers";
import useGetUserData from "../../hooks/useGetUserData";

const QuizPage = () => {
  useGetUserData();
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <SectionWrapper>
          <Card>
            <Quiz />
          </Card>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default QuizPage;
