import { authOptions, getServerAuthSession } from "~/server/auth";
import { getServerSession } from "next-auth";
import Landing from "./components/Landing";
import FloatingButton from "./components/FloatingButton";
import NewJobForm from "./components/NewJobForm";
import Dashboard from "./components/Dashboard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="relative flex min-h-screen flex-col scroll-smooth bg-[#F8FAFC] ">
      {session && <FloatingButton />}
      {session ? <Dashboard /> : <Landing />}
    </main>
  );
}