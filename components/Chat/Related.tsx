import React from "react";
import { BsStars } from "react-icons/bs";

const Related = () => {
  return (
    <div className="bg-neutral-800 cursor-pointer p-2 rounded-lg flex space-x-3 max-w-[200px] items-center">
      <div className="text-2xl">
        <BsStars />
      </div>
      <p className="text-xs">
        Fugiat cillum aliquip ut consectetur duis id proident sit?
      </p>
    </div>
  );
};

export default Related;
