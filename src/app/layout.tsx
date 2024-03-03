import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/ui/nav/Navbar";
import { getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "~/stores/AuthProvider";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Job Tracker",
  description: "Job Tracker job hunting information storing",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} `}>
        <AuthProvider session={session} >
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
