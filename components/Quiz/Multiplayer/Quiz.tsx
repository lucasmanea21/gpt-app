import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useGetQuizInfo from "../../../hooks/useGetQuizInfo";
import { supabase } from "../../../pages/api/supabase-client";
import Button from "../../Button";
import BgCard from "../../Cards/BgCard";
import Question from "../Question";

const Quiz = () => {
  const router = useRouter();
  let id = router.query.id as string;
  const { quizInfo } = useGetQuizInfo(id);
  console.log("quizInfo", quizInfo);

  const [isStarted, setIsStarted] = useState(false);

  const handleStart = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .update({ isStarted: true })
      .eq("id", id);
  };

  return (
    <BgCard className="flex justify-center">
      {!quizInfo.is_started ? (
        <div className="flex flex-col items-center justify-center w-2/3 text-center">
          <div>
            <p className="text-3xl">Multiplayer Quiz</p>
            <p>3/4 players joined</p>
          </div>
          <div className="p-5 my-8 rounded-md bg-zinc-800">
            <p>
              {
                "Maths > Calculus > Differential Equations > First-Order Differential Equations"
              }
            </p>
            <p className="">Difficulty: Hard</p>
          </div>
          <div className="space-x-4">
            <Button className="filled">Share</Button>
            <Button className="filled" onClick={handleStart}>
              Start
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Question
            question={quizInfo.questions.questions[quizInfo.step - 1].question}
            answers={quizInfo.questions.questions[quizInfo.step - 1].options}
            correctAnswer={
              quizInfo.questions.questions[quizInfo.step - 1].correct
            }
            isShowAnswer={false}
            quizData={quizInfo}
          />
        </div>
      )}
    </BgCard>
  );
};

export default Quiz;
