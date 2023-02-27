import React from "react";
import Button from "../../components/Button";
import Card from "../../components/Cards";
import Navbar from "../../components/navbar";
import Chooser from "../../components/Quiz/Chooser";
import SectionWrapper from "../../components/Wrappers";
import useGetUserData from "../../hooks/useGetUserData";

const Create = () => {
  useGetUserData();

  return (
    <div>
      <Navbar />
      <SectionWrapper>
        <Card>
          <div className="mb-3">
            <p className="text-3xl">Create Quiz</p>
            <p className="text-md">
              Testeaza-ti cunostiintele, castiga puncte si invata lucruri noi!
              🤩
            </p>
          </div>
          <div className="my-5 space-y-5">
            <div>
              <p className="mb-2 text-xl">Subiectul quizului</p>

              <Chooser />
            </div>
            <div>
              <p className="text-xl">Perioada quizului</p>
            </div>
          </div>
          <Button customClassName="filled text-xl ">Creeaza</Button>
        </Card>
      </SectionWrapper>
    </div>
  );
};

export default Create;
