"use client"

import axios from "axios";
import * as z from "zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";

const ImagePage = () => {
  const proModal = useProModal();  
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1024x1024"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
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
    <div className="h-full bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <Heading 
          title="Image Generation" 
          description="Turn your prompts into stunning images!" 
          icon={ImageIcon} 
          iconColor="text-pink-700" 
          bgColor="bg-pink-700/10" 
        />
      </div>
      <div className="px-4 lg:px-8 py-6">
        <div className="mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-lg w-full p-6 focus-within:shadow-xl focus-within:border-pink-300 transition-all duration-300 grid grid-cols-12 gap-4">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg placeholder:text-gray-400 bg-transparent" disabled={isLoading} placeholder="Example: A beautiful sunset scene over an ocean with palm trees" {...field}/>
                  </FormControl>
                </FormItem>
              )}
             />
             <FormField 
                name="amount" 
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                       <FormControl>
                         <SelectTrigger className="bg-transparent border-0 focus:ring-0">
                           <SelectValue defaultValue={field.value} />
                         </SelectTrigger>
                       </FormControl>
                       <SelectContent>
                         {amountOptions.map((option) => (
                           <SelectItem key={option.value} value={option.value}>
                             {option.label}
                           </SelectItem>
                         ))}
                       </SelectContent>
                    </Select>
                  </FormItem>
                )}
             />
             <FormField 
                name="resolution" 
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                       <FormControl>
                         <SelectTrigger className="bg-transparent border-0 focus:ring-0">
                           <SelectValue defaultValue={field.value} />
                         </SelectTrigger>
                       </FormControl>
                       <SelectContent>
                         {resolutionOptions.map((option) => (
                           <SelectItem key={option.value} value={option.value}>
                             {option.label}
                           </SelectItem>
                         ))}
                       </SelectContent>
                    </Select>
                  </FormItem>
                )}
             />
             <Button className="col-span-12 lg:col-span-2 w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
               Generate
             </Button>
            </form>
           </Form>
         </div>
         <div className="space-y-6">
           {isLoading && (
            <div className="p-12 rounded-2xl w-full flex items-center justify-center bg-white/60 backdrop-blur-sm border border-pink-100 shadow-lg">
              <Loader />
            </div>
           )}
          {images.length === 0 && !isLoading && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-lg">
                <Empty label="No images generated." imageSrc="/image-empty.png" />          
              </div>
            )}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((src) => (
                <Card key={src} className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200">
                   <div className="relative aspect-square">
                     <Image alt="Image" fill src={src} className="object-cover" />
                   </div>
                   <CardFooter className="p-4">
                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 font-medium rounded-xl">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                   </CardFooter>
                </Card>
              ))}
           </div>
         </div>
       </div>
    </div>
  );
}
  
export default ImagePage;
