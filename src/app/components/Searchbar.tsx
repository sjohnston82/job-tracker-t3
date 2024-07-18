"use client";

import Image from "next/image";
import React from "react";
import MagnifyingGlass from "../../../public/images/magnifying-glass.png";
import { useJobAppStore } from "~/stores/jobAppStore";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useJobAppStore((state) => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
  }));

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="mx-auto w-full rounded-full border border-black bg-light-gray py-2 pl-2 shadow-lg">
      <div className="border-1 mr-6 flex justify-between">
        <input
          type="text"
          className="bg-transparent pl-4 text-xl placeholder-black outline-none"
          placeholder="Search job apps..."
          value={searchTerm}
          onChange={updateSearchTerm}
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
