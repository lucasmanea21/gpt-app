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

const Create = () => {
  const [quizResponse, setQuizResponse] = useState(``);

  const [isLoading, setIsLoading] = useAtom(isQuizLoadingAtom);
  const [selected] = useAtom(quizSubjectAtom);
  const [failed, setFailed] = useState(false);

  console.log("quizResponse", quizResponse);

  const processResponse2 = async (response: string) => {
    const matches = response.match(/```([\s\S]*?)```/);

    console.log("matches", matches);

    // Check if a match was found

    const quizString = matches && matches[1];
    console.log(quizString); // Output: "asdasds"

    const res = quizString && (await createQuiz(eval(quizString)));

    console.log("res", res.data);
    res.data && handleCreated(res.data[0].id);

    console.log("quiz creation res", res);

    // console.log("response.split()", setQuizResponse(response.split("```")[1]));
  };

  const processResponse = (response: string) => {
    const questions = [];

    const lines = response.split("\n");

    let currentQuestion = {
      intrebare: "",
      raspunsuri: [],
      raspunsCorect: "",
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("Intrebar")) {
        // Adaugam un nou obiect la array-ul de intrebari si setam campul "Intrebare"
        currentQuestion = {
          intrebare: line.substring(11),
          raspunsuri: [],
          raspunsCorect: "",
        };
        questions.push(currentQuestion);
      } else if (line.startsWith("a) ")) {
        // Adaugam raspunsul la campul "Raspunsuri" al ultimei intrebari adaugate
        const answerIndex = line[0].charCodeAt(0) - "a".charCodeAt(0);
        //@ts-ignore
        currentQuestion.raspunsuri[answerIndex] = line.substring(3);

        // Verificam daca acesta este raspunsul corect
        if (line.includes("Răspunsul corect:")) {
          //@ts-ignore
          currentQuestion.raspunsCorect = String.fromCharCode(
            "a".charCodeAt(0) + answerIndex
          );
        }
      }
    }
    console.log("questions", questions);
  };

  //   const response = `Desigur, iată un quiz cu trei întrebări din domeniul istoriei:

  //  \```[
  //     ({
  //       intrebare: "Când a avut loc Marea Schismă din Biserica Catolică?",
  //       raspunsuri: ["a. 1054", "b. 1215", "c. 1378", "d. 1517"],
  //       raspunsCorect: "a",
  //     },
  //     {
  //       intrebare: "Când a avut loc Revoluția Franceză?",
  //       raspunsuri: [
  //         "a. 1789-1799",
  //         "b. 1815-1825",
  //         "c. 1848-1849",
  //         "d. 1914-1918",
  //       ],
  //       raspunsCorect: "a",
  //     },
  //     {
  //       intrebare: "Cine a fost primul împărat roman?",
  //       raspunsuri: ["a. Augustus", "b. Julius Caesar", "c. Nero", "d. Traian"],
  //       raspunsCorect: "a",
  //     })
  //   ]\```

  //   Sper că acest quiz este util! Dacă aveți nevoie de mai multe întrebări sau de un quiz din alt domeniu, vă stau la dispoziție să mă întrebați.`;
  // processResponse(response);
  // processResponse2(response);

  const GPTCall = async (prompt: string) => {
    try {
      const res = await axios.post(`${API_URL}/chat`, {
        prompt: prompt,
        type: "quiz",
      });

      res && setQuizResponse(res.data.response);
      !res.data.response && setFailed(true);
      res && setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    quizResponse && processResponse2(quizResponse);
  }, [quizResponse]);

  const handleCreate = () => {
    setIsLoading(true);
    GPTCall(selected);
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
          <div className="my-5 space-y-5">
            <div>
              <p className="mb-2 text-xl">Subiectul quizului</p>

              <Chooser />
            </div>
            {/* <div>
              <p className="text-xl">Perioada quizului</p>
            </div> */}
          </div>
          <Button
            customClassName="filled text-xl"
            onClick={() => handleCreate()}
          >
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
