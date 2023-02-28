import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Quiz from "../../components/Quiz";
import SectionWrapper from "../../components/Wrappers";
import useGetUserData from "../../hooks/useGetUserData";
import { userInfoAtom } from "../../store/atom";
import useTimeUntil from "../../utils/useTimeUntil";
import { getQuiz } from "../api/supabase-client";

const QuizPage = () => {
  useGetUserData();

  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const [quizId, setQuizId] = useState("");
  const [quizData, setQuizData] = useState({});
  const [isAllowed, setisAllowed] = useState(true);

  useEffect(() => {
    setQuizId(window.location.pathname.split("/")[2]);
  }, []);

  useEffect(() => {
    quizId && getQuizData();
  }, [quizId]);

  useEffect(() => {
    // @ts-ignore
    quizData && setisAllowed(quizData?.user_id == userInfo.id);
  }, [quizData]);

  const getQuizData = async () => {
    const { data, error } = await getQuiz(quizId);

    data && setQuizData(data[0]);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <SectionWrapper>
          {quizData && <Quiz data={quizData} />}

          {/* {isAllowed && quizData ? (
          <Quiz data={quizData} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
              Ooops! You are not allowed to see this quiz.
            </h1>
            <Button customClassName="filled mt-10" link="/">
              Go to home
            </Button>
          </div>
        )} */}
        </SectionWrapper>
      </div>
    </div>
  );
};

export default QuizPage;
