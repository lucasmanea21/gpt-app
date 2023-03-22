import { useState, useEffect } from "react";
import Select from "react-select";
import classNames from "classnames";
import { useAtom } from "jotai";
import { quizSubjectAtom } from "../../store/atom";

const Chooser = ({ items }: any) => {
  const [options, setOptions] = useState<any>([]);
  const [selected, setSelected] = useAtom(quizSubjectAtom);

  console.log("items", items);
  console.log("options", options);
  useEffect(() => {
    items &&
      setOptions(
        items.map((item: any, index: any) => ({
          value: item.name,
          label: item.name,
        }))
      );
  }, [items]);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue-300" : "blue-500",
      color: "black",
    }),
  };

  const classNames = {
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
