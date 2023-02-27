import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { questionsIndexAtom } from "../../store/atom";
import useTimeUntil from "../../utils/useTimeUntil";
import Card from "../Cards";
import Final from "./Final";
import Question from "./Question";

const Quiz = (data: any) => {
  const [questionIndex, setQuestionIndex] = useAtom(questionsIndexAtom);
  const [questions, setQuestions] = useState<any>([]);

  const { timeLeft, hours, minutes, seconds } = useTimeUntil(
    Date.parse(data.createdAt)
  );

  useEffect(() => {
    setQuestions(data.data.questions);
  }, [data]);

  const createQuiz = () => {};

  console.log("data", data);

  console.log("questions", data.data.questions);

  return (
    <Card>
      Quiz
      <div>
        {questionIndex !== 3 ? (
          questions && (
            <Question
              question={questions[questionIndex]?.question}
              answers={questions[questionIndex]?.options}
              correctAnswer={questions[questionIndex]?.answer}
            />
          )
        ) : (
          <Final question={questions[questionIndex]?.question} />
        )}
      </div>
    </Card>
  );
};

export default Quiz;
