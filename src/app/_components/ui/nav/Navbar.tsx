"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { useAuthStore } from "~/stores/AuthProvider";
import Logo from "./Logo";
import AuthWrapper from "./auth/AuthWrapper";


const Navbar = () => {
  const { data: sessionData } = useSession();
  const { user } = useAuthStore();

  return (
    <div className="flex h-24 items-center w-full justify-between bg-slate-300 p-4 text-lg">
      <Logo />
      <AuthWrapper />
    </div>
  );
};

export default Navbar;
