"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";


export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: `${window.location.origin}/Treat` });
  };

  return (
    <Button 
      onClick={handleClick }
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={'/google.png'} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Verify google</span>
    </Button>
  );
}

