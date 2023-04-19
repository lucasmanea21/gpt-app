import { useAtom } from "jotai";
import moment from "moment";
// @ts-ignore
import momentDurationFormatSetup from "moment-duration-format";
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { updatePoints } from "../../pages/api/supabase/supabase-client";
import {
  correctAnswersAtom,
  quizSubjectAtom,
  timeFinishedAtom,
  timeStartedAtom,
  userSessionAtom,
} from "../../store/atom";
import Button from "../Button";
import BgCard from "../Cards/BgCard";

const Final = ({ question }: { question: string }) => {
  const [userId] = useAtom(userSessionAtom);
  const [selected] = useAtom(quizSubjectAtom);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeFinished, setTimeFinished] = useAtom(timeFinishedAtom);
  const [timeStarted] = useAtom(timeStartedAtom);
  const [correctAnswers, setCorrectAnswers] = useAtom(correctAnswersAtom);

  momentDurationFormatSetup(moment);

  useEffect(() => {
    handleUpdatePoints();
  }, []);

  useEffect(() => {
    setTimeFinished(Date.now());
  }, [timeStarted]);

  useEffect(() => {
    timeFinished !== 0 &&
      timeStarted !== 0 &&
      setTimeElapsed(timeFinished - timeStarted);
    // setTimeElapsed(5235);
  }, [timeFinished, timeStarted]);

  const handleUpdatePoints = async () => {
    const res = await updatePoints(userId, 100);

    console.log("res", res);
  };

  console.log("timeElapsed", timeElapsed);

  return (
    <div className="bg-gray-800 p-8 rounded- flex flex-col items-center justify-center space-y-10">
      <div className="text-center">
        <p className="text-4xl font-bold">Quiz completat.</p>
        <p className="mt-3 text-md">
          Ai terminat quizul in {/* @ts-ignore */}
          {moment.duration(timeElapsed / 1000, "seconds").format("mm")}:
          {/* @ts-ignore */}
          {moment.duration(timeElapsed / 1000, "seconds").format("ss")}
        </p>
      </div>

      <div className="p-5 text-2xl bg-stone-800 rounded-xl">
        3/3 intrebari corecte
      </div>
      <div className="flex space-x-3 font-semibold">
        <div className="flex items-center justify-center p-2 px-4 space-x-2 cursor-pointer rounded-2xl bg-gradient-to-br animate-gradient from-blue-500 to-purple-700">
          <BsStars />
          <p>+20 puncte</p>
        </div>
        <div className="flex items-center justify-center p-2 px-4 space-x-2 cursor-pointer rounded-2xl bg-gradient-to-br animate-gradient from-red-500 to-yellow-600">
          <MdQuiz />
          <p>+1 quiz</p>
        </div>
      </div>

      <div>
        <Button className="filled" link="/quiz/create">
          Creaza alt quiz
        </Button>
      </div>
    </div>
  );
};

export default Final;
