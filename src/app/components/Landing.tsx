import React from "react";
import Image from "next/image";
import LandingPic from "../../../public/images/landing.jpg";

const Landing = () => {
  return (
    <>
      <section
        className="flex h-[calc(100dvh-96px)] flex-col justify-center gap-20  px-12 pt-8"
        id="main-landing"
      >
        <h1 className="text-center font-basic text-3xl font-bold">
          From Application to Offer, Keep It All in One Place
        </h1>
        <Image
          src={LandingPic}
          width={300}
          height={300}
          alt="Looking For A Job?"
          className="rounded-[4rem]"
        />
        <p className="text-center font-basic text-2xl font-bold">
          JobTracker Empowers Job Seekers, One Application at a Time
        </p>

        {/* TODO:  Add attention grabbing animation to scroll down button */}
        <button className="mx-auto flex items-center justify-center  rounded-full border border-black px-4 py-2">
          <a href="#features">
            <p className="text-xl font-bold">
              Learn More{" "}
              <span className="relative top-[-2.5px] ">&#x2304;</span>
            </p>
          </a>
        </button>
      </section>

      <section id="features"></section>
    </>
  );
};

export default Landing;
