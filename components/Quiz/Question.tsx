import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  answersAtom,
  correctAnswersAtom,
  questionsAtom,
  questionsIndexAtom,
  timeStartedAtom,
} from "../../store/atom";
import Button from "../Button";

const Answer = ({
  answer,
  keyIndex,
  setSelected,
  selected,
  isPreview,
}: {
  answer: string;
  keyIndex: number;
  setSelected: any;
  selected: string;
  isPreview: boolean;
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
      {/* {answers[keyIndex].toUpperCase()} */}
      {answer}
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
  const [answers, setAnswers] = useAtom(answersAtom);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [givenAnswer, setGivenAnswer] = useState("");

  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useAtom(correctAnswersAtom);

  let answersLetters = ["a", "b", "c", "d"];

  console.log("answers", answers);

  useEffect(() => {
    questions &&
      questionIndex &&
      setGivenAnswer(answers[answersLetters.indexOf(answer)]);
  }, [questions, questionIndex]);

  console.log("givenAnswer", givenAnswer);

  console.log("givenAnswer", givenAnswer);

  useEffect(() => {
    const isCorrectAnswer = answer === correctAnswer;
    setIsCorrect(isCorrectAnswer);

    if (isCorrectAnswer) {
      console.log("ran");
      setCorrectAnswers((prevState: any) => prevState + 1);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="text-md mb-3">Raspunsul tau:</div>
      <div>
        <Answer
          answer={givenAnswer}
          keyIndex={1}
          setSelected={() => {}}
          selected=""
          isPreview={true}
        />
      </div>

      {isCorrect ? (
        <div className="text-green-500">Correct</div>
      ) : (
        <div className="bg-gradient-to-br animate-gradient from-red-500 to-red-700 py-1 px-2 my-3 rounded-xl">
          Incorect
        </div>
      )}

      {!isCorrect && <p className="text-md mb-3">Raspunsul corect: </p>}

      <div>
        <Answer
          answer={answers[answersLetters.indexOf(correctAnswer)]}
          keyIndex={1}
          setSelected={() => {}}
          selected=""
          isPreview={true}
        />
      </div>

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
  isShowAnswer,
}: {
  question: string;
  answers: string[];
  correctAnswer: string;
  isShowAnswer: boolean;
}) => {
  const [questionIndex, setQuestionIndex] = useAtom(questionsIndexAtom);
  const [, setTimeStarted] = useAtom(timeStartedAtom);

  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState("a");

  console.log("correctAnswer", correctAnswer);

  console.log("questionIndex", questionIndex);
  useEffect(() => {
    if (questionIndex === 0) {
      setTimeStarted(Date.now());
    }
  }, [questionIndex]);

  console.log("answered", answered);

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
                  return (
                    <Answer
                      answer={answer}
                      keyIndex={index}
                      key={index}
                      setSelected={setSelected}
                      selected={selected}
                      isPreview={false}
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
