"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { type User } from "./authStore";
import { create } from "zustand";
import { useEffect } from "react";
import { type Session } from "next-auth";

interface IAuthStore {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  user: User;
  setUser: (user: User) => void;
}
export const useAuthStore = create<IAuthStore>((set) => ({
  authenticated: false,
  user: {},
  setAuthenticated: (val) => set((state) => ({ authenticated: val })),
  setUser: (user) => set({ user }),
}));

export function AuthProvider({ children, session }: { children: React.ReactNode, session: Session | null }) {



 const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
 const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (session) {
      setAuthenticated(true);
      setUser(session?.user); // Update with the actual user data
    }
  }, [session, setAuthenticated, setUser, session?.user]);
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
