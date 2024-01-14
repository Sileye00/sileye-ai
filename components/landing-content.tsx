"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const testimonials = [
    {
        name: "Alioune",
        avatar: "https://i.pravatar.cc/150?img=51",
        title: "Digital Creator",
        description: "Transform your ideas into captivating visuals and immersive experiences with this essential tool. Elevate your work seamlessly."
    },
    {
        name: "Nathalie",
        avatar: "https://i.pravatar.cc/150?img=1",
        title: "Web Developer",
        description: "I love this platform and it has become an indispensable asset in my creative toolkit, unlocking new dimensions in my digital projects."
    },
    {
        name: "Steves",
        avatar: "https://i.pravatar.cc/150?img=58",
        title: "Digital Marketer",
        description: "SilEye AI is my secret weapon for taking my digital creations to the next level. It's intuitive, powerful, and an absolute game-changer."
    },
    {
        name: "Anu",
        avatar: "https://i.pravatar.cc/150?img=67",
        title: "Product Assistant",
        description: "Revolutionize your creative process with SilEye AI. It's a transformative experience for music producers seeking innovation."
    }
];

const additionalSectionContent = {
  imageSrc: "/landing.png", 
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

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
             <CardTitle className={`flex items-center gap-x-2 ${item.avatar}`}>
                <img src={item.avatar} alt={item.name} className={`${item.avatar} rounded-full`} />
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
      <div className="my-20"></div>
      <div className="px-10 pb-20">
        <div className="flex-1">
          <img src={additionalSectionContent.imageSrc} alt="Additional Section Image" className="rounded-lg" />
        </div>
        <div className="flex-1 ml-4">
          <p className="text-white">{additionalSectionContent.text}</p>
        </div>
      </div>
    </div>
  )
}