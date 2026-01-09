import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "1024x1024" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution as "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792",
      quality: "standard",
    });

    if (!isPro) {
      await increaseApiLimit();
    }
    
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.log("[IMAGE_ERROR] Full error:", JSON.stringify(error, null, 2));
    
    // Handle specific OpenAI errors
    if (error?.response?.data?.error) {
      const openaiError = error.response.data.error;
      console.log("OpenAI Error details:", openaiError);
      
      if (openaiError.code === 'content_policy_violation') {
        return new NextResponse(`Content policy violation: ${openaiError.message}`, { status: 400 });
      }
      
      if (openaiError.code === 'billing_hard_limit_reached') {
        return new NextResponse("OpenAI API quota exceeded. Please check your billing.", { status: 402 });
      }
      
      return new NextResponse(`OpenAI Error: ${openaiError.message}`, { status: 400 });
    }
    
    // Log the error message if it exists
    if (error?.message) {
      console.log("Error message:", error.message);
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
    
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

