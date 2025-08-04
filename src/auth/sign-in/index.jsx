import { SignIn } from '@clerk/clerk-react';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn />
    </div>
  );
};

export default SignInPage;


