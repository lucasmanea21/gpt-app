import React, { useEffect, useState } from "react";
import { supabase } from "../../../pages/api/supabase-client";
import Button from "../../Button";
import BgCard from "../../Cards/BgCard";

const Quiz = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const id = window.location.pathname.split("/")[2];

  const getQuizInfo = async () => {
    const { data, error } = await supabase
      .from("multiplayer_quizzes")
      .select("*")
      .eq("id", id);

    data && setQuizInfo(data[0]);
  };

  console.log("quizInfo", quizInfo);
  useEffect(() => {
    getQuizInfo();
  }, [id]);

  //   todo: change to hook

  const handleStart = async () => {
    const { data, error } = await supabase
      .from("multiplayer_quizzes")
      .update({ isStarted: true })
      .eq("id", id);
  };
  return (
    <BgCard className="flex justify-center">
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
    </BgCard>
  );
};

export default Quiz;
