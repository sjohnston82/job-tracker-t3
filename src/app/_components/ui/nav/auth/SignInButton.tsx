import { signIn } from 'next-auth/react';
import React from 'react'

const SignInButton = () => {
  return (
    <button className="" onClick={() => signIn()}>
      Log In
    </button>
  );
}

export default SignInButton