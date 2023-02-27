import React from "react";

const SectionWrapper = ({ children }: any) => {
  return (
    <div className="w-full md:w-3/4 items-center justify-center flex flex-col md:ml-[250px] mt-16">
      {children}
    </div>
  );
};
export default SectionWrapper;
