import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { authOptions, getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { sign } from "crypto";
import { useStore } from "zustand";
// import { useAuthStore } from "~/stores/authStore";
import { getServerSession } from "next-auth";
import Landing from "./_components/Landing";

export default async function Home() {
  const session = await getServerSession(authOptions);
  noStore();
  // const { authenticated, user } = useStore(useAuthStore);


  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-center  text-white">
      {session ? <p className="">{JSON.stringify(session)}</p> : <Landing />}
    </main>
  );
}
