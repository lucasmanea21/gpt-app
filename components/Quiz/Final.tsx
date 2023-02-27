import React from "react";
import { BsStars } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import Button from "../Button";

const Final = ({ question }: { question: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="text-center">
        <p className="text-4xl font-bold">Quiz Completed.</p>
        <p className="mt-3 text-md">
          Ai terminat quizul despre Matematica in 3:01 minute.
        </p>
      </div>

      <div className="p-5 text-2xl bg-stone-800 rounded-xl">
        2/3 intrebari corecte
      </div>
      <div className="flex space-x-3 font-semibold">
        <div className="flex items-center justify-center p-2 px-4 space-x-2 cursor-pointer rounded-2xl bg-gradient-to-br animate-gradient from-blue-500 to-purple-700">
          <BsStars />
          <p>+523 puncte</p>
        </div>
        <div className="flex items-center justify-center p-2 px-4 space-x-2 cursor-pointer rounded-2xl bg-gradient-to-br animate-gradient from-red-500 to-yellow-600">
          <MdQuiz />
          <p>+1 quiz</p>
        </div>
      </div>

      <div>
        <Button customClassName="filled" link="/quiz/create">
          Creaza alt quiz
        </Button>
        <Button>Share results</Button>
      </div>
    </div>
  );
};

export default Final;
