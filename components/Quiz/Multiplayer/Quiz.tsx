import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useGetQuizInfo from "../../../hooks/useGetQuizInfo";
import { supabase } from "../../../pages/api/supabase/supabase-client";
import Button from "../../Button";
import BgCard from "../../Cards/BgCard";
import Question from "../Question";
import Room from "./Room";
import { useAtom } from "jotai";
import { stepAtom } from "../../../store/atom";

const Quiz = () => {
  const router = useRouter();
  let id = router.query.id as string;

  const { quizInfo } = useGetQuizInfo(id);
  const [step, setStep] = useAtom(stepAtom);
  const [isStarted, setIsStarted] = useState(false);

  console.log("quizInfo", quizInfo);

  useEffect(() => {
    quizInfo &&
      quizInfo.step &&
      quizInfo.step >= step &&
      setStep(quizInfo.step);
  }, [quizInfo]);

  console.log("step", step);

  return (
    <BgCard className="flex justify-center">
      {!quizInfo.is_started && !isStarted ? (
        <Room
          isPreview={false}
          setIsStarted={setIsStarted}
          id={id}
          {...quizInfo}
          ownerId={quizInfo.owner_id}
        />
      ) : (
        <div>
          <Question
            question={quizInfo.questions[step - 1].question}
            answers={quizInfo.questions[step - 1].options}
            correctAnswer={quizInfo.questions[step - 1].correct}
            isShowAnswer={false}
            quizData={quizInfo}
          />
        </div>
      )}
    </BgCard>
  );
};

export default Quiz;
