import { FC } from "react";
/********* INTERFACES **********/
import { BasicButtonProps } from "../../utils/interfaces";
const BasicButton : FC <BasicButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-white text-black border-2 border-gray-900 hover:bg-black hover:text-white font-bold py-2 px-4 rounded-md transition-all duration-300 shadow-md focus:outline-none active:transform active:scale-95"
    >
      {children}
    </button>
  );
};

export default BasicButton;
