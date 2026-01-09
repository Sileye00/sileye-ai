"use client"

import axios from "axios";
import * as z from "zod";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
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


const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
       
      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);
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
    <div className="h-full bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Heading 
          title="Video Generation" 
          description="Turn your prompt into video." 
          icon={VideoIcon} 
          iconColor="text-orange-700" 
          bgColor="bg-orange-700/10" 
        />
      </div>
      <div className="px-4 lg:px-8 py-6">
        <div className="mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-orange-200 shadow-lg w-full p-6 focus-within:shadow-xl focus-within:border-orange-300 transition-all duration-300 grid grid-cols-12 gap-4">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg placeholder:text-gray-400 bg-transparent" disabled={isLoading} placeholder=" A beautiful video with serene scenery and calming music" {...field}/>
                  </FormControl>
                </FormItem>
              )}
             />
             <Button className="col-span-12 lg:col-span-2 w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
               Generate
             </Button>
            </form>
           </Form>
         </div>
         <div className="space-y-6">
           {isLoading && (
            <div className="p-12 rounded-2xl w-full flex items-center justify-center bg-white/60 backdrop-blur-sm border border-orange-100 shadow-lg">
              <Loader />
            </div>
           )}
          {!video && !isLoading && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg">
                <Empty label="No video generated." imageSrc="/video-empty.png" />          
              </div>
            )}
           {video && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-orange-200 shadow-lg p-6">
                <video className="w-full aspect-video rounded-xl shadow-lg" controls>
                  <source src={video} />
                </video>
              </div>
           )}
         </div>
       </div>
    </div>
  );
}
  
export default VideoPage;
