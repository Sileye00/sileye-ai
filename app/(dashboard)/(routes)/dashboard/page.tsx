"use client";

import { ArrowRight, Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";


const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    description: "Engage in intelligent conversations with AI"
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
    description: "Create stunning images from text prompts"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
    description: "Transform ideas into dynamic video content"
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/music",
    description: "Compose original music with AI creativity"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    description: "Generate and optimize code with AI assistance"
  }
]

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-pink-600/10 border-b border-violet-100">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-purple-600/5 to-pink-600/5 blur-3xl"></div>
        <div className="relative px-6 py-12 mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-violet-600 animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                SilEye AI
              </h1>
              <Zap className="w-8 h-8 text-pink-600 animate-pulse" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800">
              Quantum Minds, Infinite Possibilities
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Unlock a world where creativity meets quantum intelligence. Engage in smart conversations, 
              create stunning visuals, compose original music, and bring your ideas to life.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card 
              key={tool.href} 
              onClick={() => router.push(tool.href)} 
              className={cn(
                "group relative p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden",
                "bg-white/90 backdrop-blur-sm border border-violet-100",
                "hover:scale-105 hover:-translate-y-1",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                tool.bgColor
              )}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                    tool.bgColor
                  )}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
                    {tool.label}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-violet-300 transition-all duration-300"></div>
            </Card>
          ))}
        </div>
        
        {/* Hero Illustration Section - At Bottom */}
        <div className="mt-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-violet-200 shadow-lg">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-full max-w-2xl h-64 md:h-80">
                  <Image 
                    src="/empty.png" 
                    alt="AI Creative Workspace" 
                    fill
                    className="object-contain rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Welcome to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">AI Creative Hub</span>
                  </h3>
                  <p className="text-slate-600 max-w-xl mx-auto">
                    Choose from our powerful AI tools above to bring your creative vision to life
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            Step into the future with SilEye AI
            <Zap className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default DashboardPage;