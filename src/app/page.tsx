
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { sign } from "crypto";

export default async function Home() {
  const session = await getSession();
  noStore();


  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      {session ? (
        <p className="">{JSON.stringify(session)}</p>
      ) : (
        <p>Sign In</p>
      )}
    </main>
  );
}
