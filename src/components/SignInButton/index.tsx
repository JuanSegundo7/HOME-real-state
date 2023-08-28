import React from "react";
import { SignInButtonProps } from "../../../models/types";

const SignInButton = ({ role, text, setRole }: SignInButtonProps) => {
  return (
    <div
      onClick={() => setRole(role)}
      className="max-w-[250px] w-full h-12 rounded-lg py-3 px-4 text-white bg-gradient-to-r from-teal-300  via-teal-400 via-teal-500 to-teal-600 flex justify-center items-center cursor-pointer"
    >
      <button className="font-bold">{text}</button>
    </div>
  );
};

export default SignInButton;
