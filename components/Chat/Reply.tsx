import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";
import { userSessionAtom } from "../../store/atom";
import Chat from "../Cards/ChatCard";
import Related from "./Related";
import ChatGPTLogo from "../../public/ChatGPT_logo.svg";

const Reply = ({ text }: { text: string }) => {
  const [session] = useAtom(userSessionAtom);

  return (
    <Chat bgColor="bg-slate-700">
      {" "}
      <div className="w-[60px]">
        <Image src={ChatGPTLogo} width={50} height={50} alt="LearnGPT" />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-200">
          {text
            .split(/\r?\n/)
            .filter((a) => a !== "")
            .map((item) => {
              return (
                <>
                  <p>{item}</p>
                  <br />
                </>
              );
            })}
        </p>
        {/* <div className="mt-7">
          <p className="text-lg">Intrebari asemanatoare</p>
          <div className="flex mt-3 space-x-5">
            <Related />
            <Related />
            <Related />
          </div>
        </div> */}
      </div>
    </Chat>
  );
};

export default Reply;
