import React, { useState } from "react";
import { useAtom } from "jotai";
import { questionsIndexAtom } from "../../store/atom";
import Button from "../Button";

const Answer = ({
  answer,
  keyIndex,
  setSelected,
  selected,
}: {
  answer: string;
  keyIndex: number;
  setSelected: any;
  selected: string;
}) => {
  const answers = ["a", "b", "c", "d"];

  return (
    <div
      key={keyIndex}
      onClick={() => setSelected(answers[keyIndex])}
      className={`flex items-center justify-center col-span-1 p-10 ${
        selected === answers[keyIndex] ? "bg-red-700" : "bg-gray-700"
      } rounded-lg cursor-pointer`}
    >
      {answers[keyIndex].toUpperCase()}
      {")"} {answer}
    </div>
  );
};

const Answered = ({
  answer,
  correctAnswer,
  setAnswered,
}: {
  answer: string;
  correctAnswer: string;
  setAnswered: any;
}) => {
  const [questionIndex, setQuestionIndex] = useAtom(questionsIndexAtom);

  const isCorrect = answer === correctAnswer;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-md">You answered: {answer}</div>

      {isCorrect ? (
        <div className="text-green-500">Correct</div>
      ) : (
        <div className="text-red-500">Incorrect</div>
      )}

      {!isCorrect && <p>Correct answer: {correctAnswer}</p>}

      <Button
        customClassName="filled mt-5"
        onClick={() => {
          if (questionIndex + 1 <= 3) {
            setAnswered(false);
            setQuestionIndex(questionIndex + 1);
          }
        }}
      >
        Next
      </Button>
    </div>
  );
};

const Question = ({
  question,
  answers,
  correctAnswer,
}: {
  question: string;
  answers: string[];
  correctAnswer: string;
}) => {
  const [questionIndex, setQuestionIndex] = useAtom(questionsIndexAtom);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState("a");

  console.log("selected", selected);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>Question {questionIndex + 1}</div>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-xl text-center">{question}</p>
        {!answered ? (
          <>
            <div className="grid w-full grid-cols-2 gap-5 my-8">
              {answers &&
                answers?.map((answer, index) => {
                  console.log("index,answer", index, answer);
                  return (
                    <Answer
                      answer={answer}
                      keyIndex={index}
                      key={index}
                      setSelected={setSelected}
                      selected={selected}
                    />
                  );
                })}
            </div>
            <Button
              customClassName="filled mt-5"
              onClick={() => {
                setAnswered(true);
                // if (questionIndex + 1 <= 2) {
                //   setQuestionIndex(questionIndex + 1);
                // }
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <Answered
            answer={selected}
            correctAnswer={correctAnswer}
            setAnswered={setAnswered}
          />
        )}
      </div>
    </div>
  );
};

export default Question;
