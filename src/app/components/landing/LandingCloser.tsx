import React from "react";

const LandingCloser = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-4 py-8">
      <p className="font-basic text-2xl ">The best part? It&apos;s free!</p>
      <p className="font-basic text-3xl">Ready to get started?</p>
      <div className="py-4">

      <button className="bg-button-blue rounded-3xl p-3 px-6 text-white font-basic font-bold text-2xl">
        Sign Up Now
      </button>
      </div>
    </div>
  );
};

export default LandingCloser;
