import React from "react";
import BgCard from "../../Cards/BgCard";

const Room = () => {
  return (
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
