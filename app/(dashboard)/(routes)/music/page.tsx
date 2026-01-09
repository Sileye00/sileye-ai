"use client"

import axios from "axios";
import * as z from "zod";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import toast from "react-hot-toast";


const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
       

      const response = await axios.post("/api/music", values);

      setMusic(response.data);
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

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <Heading 
          title="Music Generation" 
          description="Turn your prompt into music." 
          icon={Music} 
          iconColor="text-blue-500" 
          bgColor="bg-blue-500/10" 
        />
      </div>
      <div className="px-4 lg:px-8 py-6">
        <div className="mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-lg w-full p-6 focus-within:shadow-xl focus-within:border-blue-300 transition-all duration-300 grid grid-cols-12 gap-4">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg placeholder:text-gray-400 bg-transparent" disabled={isLoading} placeholder="Piano solo" {...field}/>
                  </FormControl>
                </FormItem>
              )}
             />
             <Button className="col-span-12 lg:col-span-2 w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
               Generate
             </Button>
            </form>
           </Form>
         </div>
         <div className="space-y-6">
           {isLoading && (
            <div className="p-12 rounded-2xl w-full flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border border-blue-100 shadow-lg">
              <Loader />
              <p className="text-sm text-blue-600 mt-4 font-medium">
                Music generation takes 1-3 minutes. Please be patient...
              </p>
            </div>
           )}
          {!music && !isLoading && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <Empty label="No music generated." imageSrc="/music-empty.png" />          
              </div>
            )}
           {music && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-lg p-6">
                <audio controls className="w-full">
                  <source src={music} />
                </audio>
              </div>
           )}
         </div>
       </div>
    </div>
  );
}
  
export default MusicPage;
