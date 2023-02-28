import { useAtom } from "jotai";
import React, { useState } from "react";
import { chatLogAtom } from "../../store/atom";
import Card from "../Cards";
import InfoCard from "../Cards/InfoCard";
import SectionWrapper from "../Wrappers";
import ChatInput from "./ChatInput";
import Message from "./Message";
import Related from "./Related";
import Reply from "./Reply";
import { recommendedQuestions } from "../../data/questions";

const InfoColumn = () => {
  return (
    <div className="flex flex-col md:w-1/3 w-full space-y-3 mb-5">
      <InfoCard />
      <InfoCard />
    </div>
  );
};

const Chat = () => {
  const [chatLog, setchatLog] = useAtom(chatLogAtom);

  let randomNumber = Math.floor(Math.random() * 10);

  console.log("chatLog", chatLog);
  return (
    <SectionWrapper className="bg-gray-800">
      <Card>
        <p className="text-3xl">Learn</p>
        <p>Invata punand intrebari legate de orice subiect.</p>
        <div
          className={`my-10 ${
            chatLog.length > 0 && "overflow-scroll"
          }  max-h-[500px]`}
        >
          {chatLog.length > 0 ? (
            <>
              {chatLog.map((item, index) => (
                <div key={index}>
                  {item.type === "question" ? (
                    <Message text={item.text} />
                  ) : (
                    <Reply text={item.text} />
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="">
              {/* <div className="flex md:space-x-6 flex-wrap w-2/3 justify-between">
                <InfoColumn />
                <InfoColumn />
              </div> */}
              <div>
                {" "}
                <p className="text-xl">Intrebari recomandate</p>
                <div className="flex mt-3 space-x-5">
                  {recommendedQuestions
                    .slice(
                      randomNumber > 3 ? randomNumber - 3 : randomNumber,
                      randomNumber > 3 ? randomNumber : randomNumber + 3
                    )
                    .map((item, index) => (
                      <Related key={index} text={item.intrebare} />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <ChatInput />
      </Card>
    </SectionWrapper>
  );
};

export default Chat;
