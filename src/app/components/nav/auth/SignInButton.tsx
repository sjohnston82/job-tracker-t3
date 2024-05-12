import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const signInWithClick = async () => {
    console.log("clicked");
    await signIn();
  };
  return (
    <button
      className="cursor-pointer rounded-full border border-black px-4 shadow-md shadow-gray-500 hover:scale-105 hover:font-semibold hover:duration-200"
      onClick={() => signInWithClick()}
    >
      Sign In
    </button>
  );
};

export default SignInButton;
