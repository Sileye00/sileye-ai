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
        <nav className="p-4 bg-transparent flex items-center justify-between">
           <Link href="/" className="flex items-center">
              <div className="relative h-24 w-48">
                 <Image fill alt="Logo" src="/logo.png" />
              </div>
              <h1 className={cn("text-2xl font-bold text-white -ml-6", font.className)}>
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