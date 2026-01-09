import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-20 h-10 relative animate-spin">
        <Image 
          alt="Logo" 
          fill 
          src="/logo.png" 
          className="object-contain filter invert"
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
      </div>
      <p className="text-sm text-muted-foreground">
        SilEye AI is thinking...
      </p>
    </div>
  );
};
