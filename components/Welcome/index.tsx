import React from "react";
import Button from "../Button";
import Card from "../Cards";
import SectionWrapper from "../Wrappers";

const Welcome = () => {
  return (
    <div className="flex justify-center">
      <SectionWrapper>
        <Card>
          <div className="flex flex-col items-center ">
            <div className="text-center">
              <p className="text-4xl mb-3">Welcome to LearnGPT</p>
              <p>Quis aute est consequat ex fugiat ex deserunt dolor eu.</p>
            </div>
            <div className="w-1/2 mt-10">
              <Button
                link="/auth"
                customClassName="text-2xl filled  py-5 h-[50px] flex justify-center items-center text-center"
              >
                Conecteaza-te pentru a incepe!
              </Button>
            </div>
          </div>
        </Card>
      </SectionWrapper>
    </div>
  );
};

export default Welcome;
