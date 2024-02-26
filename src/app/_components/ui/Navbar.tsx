"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { type Session } from "next-auth";

const Navbar = ({ session }: { session: Session | null }) => {
  // const { data: sessionData } = useSession();
  return (
    <div className="h-48 bg-blue-500 text-lg">
      {session ? (
        <button onClick={() => signOut}>Sign Out</button>
      ) : (
        <button className="" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
