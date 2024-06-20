import { useSession } from "next-auth/react";
import React from "react";
import { useAuthStore } from "~/stores/authStore";
import SignInButton from "./SignInButton";
import UserOptions from "./UserOptions";

const AuthWrapper = () => {
  const { data: sessionData } = useSession();
  const { user } = useAuthStore();

  return (
    <div className="">
      {sessionData ? <UserOptions />  : <SignInButton />}
      {/* <h1 className="">{user?.name}</h1> */}
    </div>
  );
};

export default AuthWrapper;
