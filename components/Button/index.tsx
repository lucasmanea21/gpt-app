import React from "react";

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  newTab?: boolean;
  link?: string;
  className?: string;
  children?: any;
}

const Button = ({
  onClick,
  label,
  newTab,
  link,
  className,
  children,
}: ButtonProps) => {
  return (
    <a
      href={link}
      target={newTab ? "_blank" : ""}
      rel="noreferrer"
      onClick={onClick}
      className={`btn ${className} `}
    >
      {children}
    </a>
  );
};

export default Button;
