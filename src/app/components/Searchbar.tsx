import Image from "next/image";
import React from "react";
import MagnifyingGlass from "../../../public/images/magnifying-glass.png";

const Searchbar = () => {
  return (
    <div className="bg-light-gray mx-auto w-full rounded-full border border-black py-2 pl-2 shadow-lg">
      <div className="border-1 mr-6 flex  justify-between ">
        <input
          type="text"
          className="bg-transparent pl-4 text-xl placeholder-black outline-none"
          placeholder="Search job apps..."
        />
        <Image
          src={MagnifyingGlass}
          width={25}
          height={25}
          alt="Search"
          className=""
        />
      </div>
    </div>
  );
};

export default Searchbar;
