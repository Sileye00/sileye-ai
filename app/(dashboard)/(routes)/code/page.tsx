"use client"

import axios from "axios";
import * as z from "zod";
import { Code, Copy, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessageParam[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
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

      const response = await axios.post("/api/code", { messages: newMessages });
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
  }

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <Heading 
          title="Code Generation" 
          description="Describe your ideas and let the magic of Code Generation bring them to life!" 
          icon={Code} 
          iconColor="text-green-700" 
          bgColor="bg-green-700/10" 
        />
      </div>
      <div className="px-4 lg:px-8 py-6">
        <div className="mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-green-200 shadow-lg w-full p-6 focus-within:shadow-xl focus-within:border-green-300 transition-all duration-300 grid grid-cols-12 gap-4">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg placeholder:text-gray-400 bg-transparent" disabled={isLoading} placeholder="Example: Build a JavaScript function to add two numbers and return the result" {...field}/>
                  </FormControl>
                </FormItem>
              )}
             />
             <Button className="col-span-12 lg:col-span-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
               Generate
             </Button>
            </form>
           </Form>
         </div>
         <div className="space-y-6">
           {isLoading && (
            <div className="p-12 rounded-2xl w-full flex items-center justify-center bg-white/60 backdrop-blur-sm border border-green-100 shadow-lg">
              <Loader />
            </div>
           )}
          {messages.length === 0 && !isLoading && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 shadow-lg">
                <Empty label="No conversation started." imageSrc="/code-empty.png" />          
              </div>
            )}
           <div className="flex flex-col-reverse gap-y-6">
             {messages.map((message) =>(
               <div 
                 key={message.content?.toString() || ''}
                 className={cn(
                   "p-6 w-full flex items-start gap-x-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl",
                   message.role === "user" 
                     ? "bg-white/90 backdrop-blur-sm border border-green-200 ml-8" 
                     : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 mr-8",
                 )}
                >
                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                 <ReactMarkdown
                   components={{
                     pre: ({ node, children, ...props }) => {
                       const codeContent = String(children).replace(/\n$/, '');
                       return (
                         <div className="relative group">
                           <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-xl">
                             <span className="text-sm font-medium">Code</span>
                             <Button
                               onClick={() => copyToClipboard(codeContent)}
                               size="sm"
                               variant="ghost"
                               className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                             >
                               {copiedCode === codeContent ? (
                                 <Check className="h-4 w-4" />
                               ) : (
                                 <Copy className="h-4 w-4" />
                               )}
                             </Button>
                           </div>
                           <div className="overflow-auto bg-gray-900 text-green-400 p-4 rounded-b-xl border-t border-gray-700">
                             <pre className="text-sm font-mono" {...props}>
                               {children}
                             </pre>
                           </div>
                         </div>
                       );
                     },
                     code: ({ node, ...props }) => {
                       return (
                         <code className="bg-gray-100 text-green-700 rounded-md px-2 py-1 font-mono text-sm" {...props} />
                       );
                     }
                   }}
                   className="text-base leading-relaxed text-gray-700 overflow-hidden w-full"
                 >
                   {message.content?.toString() || ''}
                 </ReactMarkdown>
               </div>
             ))}
           </div>
         </div>
       </div>
    </div>
  );
}
  
export default CodePage;
