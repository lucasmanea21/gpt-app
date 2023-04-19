import React from "react";
import BgCard from "../../Cards/BgCard";
import Button from "../../Button";
import { supabase } from "../../../pages/api/supabase/supabase-client";

const Room = ({
  isPreview,
  ownerId,
  subject,
  setIsStarted,
  id,
}: {
  isPreview: boolean;
  ownerId?: string;
  subject?: string;
  setIsStarted?: any;
  id?: string;
}) => {
  const handleStart = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .update({ is_started: true })
      .eq("id", id)
      .select();

    console.log("data", data);

    data && setIsStarted(true);
  };
  return !isPreview ? (
    <div className="flex flex-col items-center justify-center w-2/3 text-center">
      <div>
        <p className="text-3xl">Multiplayer Quiz</p>
        <p>3/4 players joined</p>
        <p>Owner: {ownerId}</p>
      </div>
      <div className="p-5 my-8 rounded-md bg-zinc-800">
        <p>Subject: {subject}</p>
        <p className="">Difficulty: Hard</p>
      </div>
      <div className="space-x-4">
        <Button className="filled">Share</Button>
        <Button className="filled" onClick={handleStart}>
          Start
        </Button>
      </div>
    </div>
  ) : (
    <BgCard className="flex-grow w-full p-2 mx-2 bg-gray-900 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
      <div className="text-center">
        <p>3/4 players joined</p>
        <div className="my-2">
          <p>Maths</p>
          <p>Difficulty: Easy </p>
        </div>
        <p>Hosted by Lucas Manea</p>
      </div>
    </BgCard>
  );
};

export default Room;
