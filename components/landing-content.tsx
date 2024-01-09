"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
        name: "Alioune",
        avatar: "A",
        title: "Digital Creator",
        description: "A must-have tool for any digital creator looking to elevate their work."
    },
    {
        name: "Nathalie",
        avatar: "N",
        title: "Web Developer",
        description: "I love this platform and it has become an indispensable asset in my creative toolkit, unlocking new dimensions in my digital projects."
    },
    {
        name: "Steves",
        avatar: "S",
        title: "Digital Marketer",
        description: "SilEye AI is my secret weapon for taking my digital creations to the next level. It's intuitive, powerful, and an absolute game-changer."
    },
    {
        name: "Anu",
        avatar: "A",
        title: "Product  Assistant",
        description: "Revolutionize your creative process with SilEye AI. It's a transformative experience for music producer and digital creators seeking innovation."
    }
]

export const LandingContent = () => {
    return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
           <Card key={item.description} className="bg-[#192339] border-none text-white">
             <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                   <div>
                      <p className="text-lg">{item.name}</p>
                      <p className="text-zinc-400 text-sm">{item.title}</p>
                   </div>
                </CardTitle>
                <CardContent className="pt-4 px-0">
                    {item.description}
                </CardContent>   
             </CardHeader>           
           </Card>
        ))}
      </div>
    </div>
  )
}