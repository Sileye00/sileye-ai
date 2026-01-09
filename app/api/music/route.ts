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
      prompt_a: prompt
    };

    const output = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      { input }
    ) as any;
    
    console.log('[MUSIC_OUTPUT]', output);
    
    // Get the URL from the output
    const musicUrl = output?.audio || output;
    console.log('[MUSIC_URL]', musicUrl);

    if (!isPro) {
      await increaseApiLimit();
    }
  
    return NextResponse.json(musicUrl);
  } catch (error: any) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse(`Music generation failed: ${error.message}`, { status: 500 });
  }
}

