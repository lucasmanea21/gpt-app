import React from "react";

const SectionWrapper = ({ children }: any) => {
  return (
    <div className="w-full h-screen bg-gray-900 md:w-full items-center justify-center flex flex-col md:ml-[250px] ">
      {children}
    </div>
  );
};
export default SectionWrapper;
