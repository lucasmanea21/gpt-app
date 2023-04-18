import axios from "axios";
import { create } from "domain";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { createQuiz } from "../../pages/api/supabase-client";
import { isQuizLoadingAtom, quizSubjectAtom } from "../../store/atom";
import { API_URL } from "../../utils/config";
import Button from "../Button";
import Card from "../Cards";
import BgCard from "../Cards/BgCard";
import Chooser from "./Chooser";
import Loading from "./Loading";
import { subjects } from "../../data/subjects.js";
import { useRouter } from "next/router";

const Create = () => {
  const [quizResponse, setQuizResponse] = useState(``);
  const router = useRouter();

  const [isLoading, setIsLoading] = useAtom(isQuizLoadingAtom);
  const [selected] = useAtom(quizSubjectAtom);
  const [failed, setFailed] = useState(false);

  console.log("quizResponse", quizResponse);

  const createRoom = async (subject: string, creatorUserId: string) => {
    try {
      const response = await axios.post(`${API_URL}/rooms/create`, {
        subject,
        creatorUserId,
      });

      return response.data.id;
    } catch (error: any) {
      console.error(error.message);

      return error.message;
    }
  };

  const handleCreateQuiz = async () => {
    const creatorUserId = ""; // Get the current user's ID

    const roomId = await createRoom("literatura", creatorUserId);
    console.log("roomId", roomId);
    if (roomId) {
      // Redirect the user to the created room, or update the UI accordingly
      router.push(`/live/${roomId}`);
    } else {
      // Show an error message to the user
      setFailed(true);
    }
  };

  const handleCreate = () => {
    setIsLoading(true);
    handleCreateQuiz();
  };

  const handleCreated = (id: string) => {
    //redirect to quiz
    window.location.href = `/quiz/${id}`;
  };

  console.log("isLoading, quizResponse", isLoading, quizResponse);

  return (
    <BgCard>
      {!isLoading ? (
        <>
          <div className="mb-3">
            <p className="text-3xl">Create Quiz</p>
            <p className="text-md">
              Testeaza-ti cunostiintele, castiga puncte si invata lucruri noi!
              🤩
            </p>
          </div>
          <div className="space-y-5 my-7">
            <div>
              <p className="mb-2 text-xl">Subiectul quizului</p>

              <Chooser items={subjects} />
            </div>
            <div className="flex justify-between w-full space-x-4">
              <div className="w-1/2">
                {/* Type of quiz: short, medium, long */}
                <p className="mb-2 text-xl">Type of quiz</p>
                <Chooser
                  items={[
                    { name: "Short: 3 questions" },
                    { name: "Medium: 5 questions" },
                    { name: "Long: 10 questions" },
                  ]}
                />
              </div>
              <div className="w-1/2">
                {/* Difficulty: easy, medium, hard  */}
                <p className="mb-2 text-xl">Difficulty</p>
                <input
                  className="block w-full px-4 py-2 leading-normal bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
                  type="number"
                  min="1"
                  max="10"
                />
              </div>
            </div>
            <div>
              {/* is public check */}
              <p className="mb-2 text-xl">Let others join</p>
              <label>
                <input
                  className="block w-full px-4 py-2 leading-normal bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
                  type="checkbox"
                  // checked={isChecked}
                  // onChange={handleCheckboxChange}
                />
                Checkbox Label
              </label>
            </div>
            {/* <div>
              <p className="text-xl">Perioada quizului</p>
            </div> */}
          </div>
          <Button className="filled text-md " onClick={() => handleCreate()}>
            Creeaza
          </Button>{" "}
        </>
      ) : (
        <Loading failed={failed} />
      )}
    </BgCard>
  );
};

export default Create;
