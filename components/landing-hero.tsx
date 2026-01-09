"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";



export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div>
            <div className="text-white font-bold py-36 text-center space-y-5">
               <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>Unlock Creativity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-600">SilEyeAI</span></h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  <TypewriterComponent 
                    options={{
                        strings: [
                            "Chatbot",
                            "Image Generation",
                            "Music Generation",
                            "Video Generation",
                            "Code Generation",
                        ],
                        autoStart: true,
                        loop: true,
                    }}             
                   />
                </div>
               </div>
               <div className="text-sm md:text-xl font-light text-zinc-400">
                  Your Gateway to Infinite Possibilities!
               </div>
               <div>
                 <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Generate For Free
                    </Button>
                 </Link>
               </div>         
            </div>
            
            {/* Animated Glowing Separator */}
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-ping opacity-75"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full animate-bounce"></div>
              </div>
            </div>
        </div>
    )
}