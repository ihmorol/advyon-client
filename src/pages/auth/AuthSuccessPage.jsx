import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
import DynamicBackground from '@/components/ui/DynamicBackground';

const AuthSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show success toast
    toast.success("Login Successful!", {
      description: "Redirecting to dashboard...",
      duration: 3000,
    });

    // Redirect after delay
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh]">
      <div className="bg-[#1C4645]/10 p-4 rounded-full mb-6 border border-[#3A7573]/20 animate-pulse">
        <CheckCircle className="w-16 h-16 text-[#3A7573]" />
      </div>
      
      <h2 className="text-3xl font-bold text-[#1C4645] mb-2 dark:text-white">
        Welcome Back!
      </h2>
      
      <p className="text-gray-500 text-center max-w-sm mb-8 dark:text-gray-400">
        You have successfully logged in. We're taking you to your dashboard now.
      </p>

      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#3A7573] animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-[#3A7573] animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 rounded-full bg-[#3A7573] animate-bounce"></div>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
