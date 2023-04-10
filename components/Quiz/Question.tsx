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
import axios from "axios";
import { API_URL } from "../../utils/config";
import { supabase } from "../../pages/api/supabase-client";

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
      {/* <div className="mb-3 text-md">Raspunsul tau:</div>
      <div>
        <Answer
          answer={givenAnswer}
          keyIndex={1}
          setSelected={() => {}}
          selected=""
          isPreview={true}
        />
      </div> */}

      {isCorrect ? (
        <div className="px-2 py-1 my-3 bg-gradient-to-br animate-gradient from-green-500 to-green-700 rounded-xl">
          Corect!
        </div>
      ) : (
        <div className="px-2 py-1 my-3 bg-gradient-to-br animate-gradient from-red-500 to-red-700 rounded-xl">
          Incorect
        </div>
      )}

      {!isCorrect && <p className="mb-3 text-md">Raspunsul corect: </p>}

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
        className="mt-5 filled"
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
  quizData,
}: {
  question: string;
  answers: string[];
  correctAnswer: string;
  isShowAnswer: boolean;
  quizData?: any;
}) => {
  const [questionIndex, setQuestionIndex] = useAtom(questionsIndexAtom);
  const [, setTimeStarted] = useAtom(timeStartedAtom);
  const { id: quizId, step } = quizData;

  console.log("quizData", quizData);

  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState("a");
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    if (questionIndex === 0) {
      setTimeStarted(Date.now());
    }
  }, [questionIndex]);

  const handleSubmitAnswer = async () => {
    const res = axios
      .post(`${API_URL}/quiz/response`, {
        userId: "6e5931d6-74e4-4450-8ff6-acc5831b3f8f",
        quizId: quizId,
        step: questionIndex + 1,
        answerId: selected,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    const fetchResponseCount = async () => {
      console.log("quizId,step", quizId, step);
      const { data: responses, error } = await supabase
        .from("responses")
        .select("id", { count: "exact" })
        .eq("quiz_id", quizId)
        .eq("step", step);

      if (error) {
        console.error("Error fetching response count:", error);
      } else {
        setResponseCount(responses.length);
      }
    };

    quizId && step && fetchResponseCount();

    const subscription = supabase
      .channel(`any`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "responses" },
        () => {
          setResponseCount((prevCount) => prevCount + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [quizId, step]);

  console.log("quizId,step", quizId, step);

  console.log("responseCount", responseCount);

  console.log("answered", answered);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-3 text-xl">Question {questionIndex + 1}</div>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="mb-4 text-3xl text-center">{question}</p>
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
            <div>{responseCount}/3 answered</div>
            <Button
              className="mt-5 text-xl filled"
              onClick={() => {
                setAnswered(true);
                handleSubmitAnswer();
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
