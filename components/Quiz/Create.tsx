import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { isQuizLoadingAtom, quizSubjectAtom } from "../../store/atom";
import Button from "../Button";
import Card from "../Cards";
import Chooser from "./Chooser";
import Loading from "./Loading";

const Create = () => {
  const [quizResponse, setQuizResponse] = useState(
    `Bineinteles, sunt gata sa iti creez quiz-ul despre subiectul "Științe". 
    Iata cele trei intrebari ale tale:\n\nIntrebarea 
    1:\nCare este cel mai mic element al tabelului periodic al elementelor?\n
    a) Hidrogen\nb) Helium\nc) Carbon\nd) Oxigen\n\nRaspunsul corect: 
    a) Hidrogen\n\nIntrebarea 2:\nCe este ADN-ul?\n
    a) Un tip de celula\nb) O proteina\nc) Un acord de muzica\nd) Un acid nucleic\n\nRaspunsul corect: d) Un acid nucleic\n\nIntrebarea 3:\nCare este procesul prin care plantele folosesc lumina solara pentru a produce energie?\na) Fotosinteza\nb) Fermentatia\nc) Osmoza\nd) Respiratia celulara\n\nRaspunsul corect: a) Fotosinteza\n\nSper ca acest quiz sa fie interesant si educativ pentru tine!`
  );

  const [isLoading, setIsLoading] = useAtom(isQuizLoadingAtom);
  const [selected] = useAtom(quizSubjectAtom);

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

      if (line.startsWith("Intrebare: ")) {
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
  };

  processResponse(quizResponse);

  const GPTCall = async (prompt: string) => {
    const res = await axios.post("http://localhost:8080/chat", {
      prompt: prompt,
      type: "quiz",
    });

    res && setQuizResponse(res.data.response);
    res && setIsLoading(false);
  };

  const handleCreate = () => {
    setIsLoading(true);
    GPTCall(selected);
  };

  return (
    <Card>
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
            <div>
              <p className="text-xl">Perioada quizului</p>
            </div>
          </div>
          <Button
            customClassName="filled text-xl"
            onClick={() => handleCreate()}
          >
            Creeaza
          </Button>{" "}
        </>
      ) : (
        <Loading />
      )}
    </Card>
  );
};

export default Create;
