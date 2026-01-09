"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Sparkles, Zap, Brain, Lightbulb } from "lucide-react";


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
        description: "SilEye AI is my secret weapon for taking my digital creations to the next level. It&apos;s intuitive, powerful, and an absolute game-changer."
    },
    {
        name: "Anu",
        avatar: "https://i.pravatar.cc/150?img=67",
        title: "Product Assistant",
        description: "Revolutionize your creative process with SilEye AI. It&apos;s a transformative experience for music producers seeking innovation."
    }
];

export const LandingContent = () => {
    return (
    <div className="px-10 pb-20">
      
      {/* Transition Text Section */}
      <div className="text-center py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-600">Advanced AI Technology</span>
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            Powered by next-generation AI technology that understands creativity like never before. Experience intelligent tools that adapt to your vision and amplify your creative potential beyond imagination.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400">10M+</div>
              <div className="text-sm text-slate-400">Creations Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">50K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Feature Section */}
      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-3xl"></div>
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-12 border border-slate-700">
          
          {/* Full Width Image Section */}
          <div className="mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
                <Image 
                  src="/landing.png" 
                  alt="SilEye AI Platform" 
                  width={1200} 
                  height={700} 
                  className="rounded-xl shadow-2xl w-full h-auto object-cover min-h-[500px]"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-violet-500/20 backdrop-blur-sm rounded-full p-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="bg-pink-500/20 backdrop-blur-sm rounded-full p-2">
                    <Zap className="w-5 h-5 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Below Image */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-violet-400" />
              <h3 className="text-3xl font-bold text-white">
                Experience the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-600">AI Creativity</span>
              </h3>
            </div>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Unlock limitless possibilities with SilEye AI&apos;s cutting-edge technology. From intelligent conversations to stunning visuals, 
              our platform empowers creators, developers, and innovators to bring their wildest ideas to life.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <Lightbulb className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                <h4 className="font-semibold text-white mb-2 text-lg">Smart Innovation</h4>
                <p className="text-slate-400">AI-powered creativity at your fingertips</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <Zap className="w-8 h-8 text-pink-400 mb-3 mx-auto" />
                <h4 className="font-semibold text-white mb-2 text-lg">Lightning Fast</h4>
                <p className="text-slate-400">Generate content in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section - Moved to Bottom */}
      <div className="mt-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {testimonials.map((item) => (
             <Card key={item.description} className="bg-[#192339] border-none text-white">
               <CardHeader>
               <CardTitle className={`flex items-center gap-x-2 ${item.avatar}`}>
                  <Image src={item.avatar} alt={item.name} width={150} height={150} className={`${item.avatar} rounded-full`} />
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
    </div>
  )
}