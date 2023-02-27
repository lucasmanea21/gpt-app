import React from "react";
import Select from "react-select";
import classNames from "classnames";

const Chooser = () => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue-300" : "blue-500",
      color: "black",
    }),
  };

  const customClassNames = {
    option: classNames(
      "p-4", // Padding
      "hover:bg-blue-500", // Hover background color
      "focus:bg-blue-500", // Focus background color
      "focus:outline-none" // Remove default focus outline
    ),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      classNamePrefix="react-select"
      //   @ts-ignore
      className={"bg-blue-500 hover:bg-blue-500"}
    />
  );
};

export default Chooser;
