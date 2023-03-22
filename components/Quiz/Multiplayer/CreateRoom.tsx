import React from "react";
import BgCard from "../../Cards/BgCard";
import { HiPlus } from "react-icons/hi";

const CreateRoom = () => {
  return (
    <BgCard className="flex items-center flex-grow p-2 mx-2 bg-gray-900 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
      <div className="flex items-center w-full ">
        <HiPlus size={70} />
      </div>
    </BgCard>
  );
};

export default CreateRoom;
