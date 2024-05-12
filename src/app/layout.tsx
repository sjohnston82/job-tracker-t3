import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Raleway, Merriweather_Sans } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./components/nav/Navbar";
import AuthProvider from "~/stores/AuthProvider";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";
import { type Viewport } from "next";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Job Tracker",
  description: "Job Tracker job hunting information storing",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${merriweather.variable} scroll-smooth`}
    >
      <body>
        <AuthProvider session={session}>
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
