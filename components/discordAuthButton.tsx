import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";


export function DiscordSignInButton() {
    const handleClick = () => {
      signIn("discord", { callbackUrl: `${window.location.origin}/Questionairre` });
    };
   
    return (
      <Button
        onClick={handleClick}
        className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
      >
        <Image src={'/X.png'} alt="XLOGO" width={20} height={20} />
        <span className="ml-4">Verify Discord Account</span>
      </Button>
    );
  }
  
  