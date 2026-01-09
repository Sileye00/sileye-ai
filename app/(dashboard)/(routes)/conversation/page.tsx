"use client"

import axios from "axios";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import OpenAI from "openai";
import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";

import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";


const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessageParam[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.ChatCompletionMessageParam = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("An error occurred while generating your response. Please check your prompt and try again.")
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-violet-100">
        <Heading 
          title="Conversation" 
          description="Chat effortlessly with SilEye AI where simplicity meets intelligence." 
          icon={MessageSquare} 
          iconColor="text-violet-500" 
          bgColor="bg-violet-500/10" 
        />
      </div>
      <div className="px-4 lg:px-8 py-6">
        <div className="mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-violet-200 shadow-lg w-full p-6 focus-within:shadow-xl focus-within:border-violet-300 transition-all duration-300 grid grid-cols-12 gap-4">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input 
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg placeholder:text-gray-400 bg-transparent" 
                      disabled={isLoading} 
                      placeholder="Start your intelligent conversation here...Ask me anything!" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
             />
             <Button 
               className="col-span-12 lg:col-span-2 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
               disabled={isLoading}
             >
               Generate
             </Button>
            </form>
           </Form>
         </div>
         <div className="space-y-6">
           {isLoading && (
            <div className="p-12 rounded-2xl w-full flex items-center justify-center bg-white/60 backdrop-blur-sm border border-violet-100 shadow-lg">
              <Loader />
            </div>
           )}
          {messages.length === 0 && !isLoading && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-100 shadow-lg">
                <Empty label="No conversation started." imageSrc="/conversation-empty.png" />          
              </div>
            )}
           <div className="flex flex-col-reverse gap-y-6">
             {messages.map((message) =>(
               <div 
                 key={message.content?.toString() || ''}
                 className={cn(
                   "p-6 w-full flex items-start gap-x-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl",
                   message.role === "user" 
                     ? "bg-white/90 backdrop-blur-sm border border-violet-200 ml-8" 
                     : "bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 mr-8",
                 )}
                >
                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                 <p className="text-base leading-relaxed text-gray-700">
                   {message.content?.toString() || ''}
                 </p>
               </div>
             ))}
           </div>
         </div>
       </div>
    </div>
  );
}
  
export default ConversationPage;
