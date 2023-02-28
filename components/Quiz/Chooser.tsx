import { useState, useEffect } from "react";
import Select from "react-select";
import classNames from "classnames";
import { subjects } from "../../data/subjects.js";
import { useAtom } from "jotai";
import { quizSubjectAtom } from "../../store/atom";

const Chooser = () => {
  const [options, setOptions] = useState<any>([]);
  const [selected, setSelected] = useAtom(quizSubjectAtom);

  useEffect(() => {
    setOptions(
      subjects.map((item, index) => ({
        value: item.subiectPrincipal,
        label: item.subiectPrincipal,
      }))
    );
  }, []);

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
      onChange={(e: any) => setSelected(e.value)}
    />
  );
};

export default Chooser;
