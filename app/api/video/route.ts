import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const input = {
      prompt: prompt
    };

    console.log('[VIDEO] Starting generation...');
    const output = await replicate.run("wan-video/wan-2.5-t2v-fast", { input });
    
    console.log('[VIDEO_OUTPUT]', output);
    console.log('[VIDEO_OUTPUT_TYPE]', typeof output);
    
    // Get the URL from the output object
    const videoUrl = output.url();
    console.log('[VIDEO_URL]', videoUrl);
    
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json([videoUrl]);

  } catch (error: any) {
    console.log("[VIDEO_ERROR] Full error:", error);
    console.log("[VIDEO_ERROR] Error message:", error.message);
    return new NextResponse(`Video generation failed: ${error.message}`, { status: 500 });
  }
}

