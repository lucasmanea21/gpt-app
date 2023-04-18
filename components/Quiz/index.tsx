import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import {
  answersAtom,
  questionsAtom,
  questionsIndexAtom,
} from "../../store/atom";
import useTimeUntil from "../../utils/useTimeUntil";
import Card from "../Cards";
import Final from "./Final";
import Question from "./Question";

const Quiz = (data: any) => {
  const [questionIndex, setQuestionIndex] = useAtom(questionsIndexAtom);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [answers, setAnswers] = useAtom(answersAtom);

  const { timeLeft, hours, minutes, seconds } = useTimeUntil(
    Date.parse(data.createdAt)
  );

  useEffect(() => {
    questions && setAnswers(questions[questionIndex]?.options);
  }, [questions]);

  useEffect(() => {
    setQuestions(data.data.questions);
  }, [data]);

  const createQuiz = () => {};

  return (
    <Card>
      {questions && (
        <div>
          {questionIndex !== 3 ? (
            questions && (
              <Question
                question={questions[questionIndex]?.question}
                answers={questions[questionIndex]?.options}
                correctAnswer={questions[questionIndex]?.correct}
                isShowAnswer={questionIndex === 3}
                quizData={data}
              />
            )
          ) : (
            <Final question={questions[questionIndex]?.question} />
          )}
        </div>
      )}
    </Card>
  );
};

export default Quiz;
