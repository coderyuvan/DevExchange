"use client";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router";
import React from "react";
const Layout=({children}:{children:React.ReactNode})=>{

    const {session}=useAuthStore();
    const router=useRouter()
    React.useEffect(()=>{
      if(session)
        router.push('/')
    },[session,router]);
    if(session) return null;
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
          <BackgroundBeamsWithCollision >
          <div className="relative">{children}</div>
          </BackgroundBeamsWithCollision>
        </div>
        
      )

}

export default Layout


 