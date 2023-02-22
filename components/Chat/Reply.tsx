import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";
import { userSessionAtom } from "../../store/atom";
import Chat from "../Cards/ChatCard";
import Related from "./Related";

const Reply = () => {
  const [session] = useAtom(userSessionAtom);

  return (
    <Chat bgColor="bg-slate-700">
      {" "}
      <div className="w-[60px]">
        <Image
          src={session?.user?.user_metadata.picture}
          width={50}
          height={50}
          alt="pfp"
        />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-200">
          Elit ut deserunt enim sunt fugiat tempor labore fugiat fugiat dolore.
          Tempor sint irure magna excepteur eiusmod non non ex. Laborum ea non
          id non Lorem est occaecat proident commodo irure nostrud labore et ea.
          Occaecat exercitation aliquip ullamco nisi sit cupidatat veniam culpa
          cillum mollit et deserunt. Ullamco ea proident enim do labore. Esse
          velit labore ullamco magna laborum fugiat.
          <br />
          <br />
          Voluptate veniam quis officia tempor deserunt officia anim non ad
          commodo magna tempor dolore. Magna ipsum dolor dolore ex laborum nulla
          et. Proident consequat do reprehenderit nisi laborum laborum sint
          pariatur.
        </p>
        <div className="mt-7">
          <p className="text-lg">Intrebari asemanatoare</p>
          <div className="flex space-x-5 mt-3">
            <Related />
            <Related />
            <Related />
          </div>
        </div>
      </div>
    </Chat>
  );
};

export default Reply;
