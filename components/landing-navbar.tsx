"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";



const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();
    
    return (
        <nav className="p-4 bg-transparent flex items-center justify-between h-20">
           <Link href="/" className="flex items-center -ml-8 md:-ml-16 -my-4">
              <div className="relative h-[176px] w-[176px]">
                 <Image fill alt="Logo" src="/logo.png" className="object-contain" />
              </div>
              <h1 className={cn("text-lg md:text-2xl font-bold text-white -ml-10 md:-ml-10", font.className)}>
                SilEyeAI
              </h1>
           </Link>
           <div className="flex items-center gap-x-2">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant="outline" className="rounded-full">
                    Get Started
                </Button>
            </Link>
           </div>

        </nav>
    )
}