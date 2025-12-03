import React from 'react';
import { SignIn } from "@clerk/clerk-react";

const SignInForm = () => {
  return (
    <div className="w-full flex justify-center">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-[#1C4645] hover:bg-[#1D4746] text-white',
            card: 'shadow-none w-full',
            headerTitle: 'text-[#1C4645]',
            headerSubtitle: 'text-gray-500',
            socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50 text-gray-700',
            formFieldInput: 'border-gray-200 focus:border-[#3A7573] focus:ring-[#3A7573]/10',
            footerActionLink: 'text-[#3A7573] hover:text-[#1D4746]'
          }
        }}
        signUpUrl="/auth/signup"
      />
    </div>
  );
};

export default SignInForm;
