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
              <p className="text-6xl font-semibold mb-6">Welcome to LearnGPT</p>
              <p className="text-lg ">
                O platforma educativa, complet alimentata de inteligenta
                artificiala.
              </p>
            </div>
            <div className="w-1/3 mt-16">
              <Button
                link="/auth"
                className="text-lg filled w-full px-4 py-3 h-[50px] flex justify-center items-center text-center"
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
