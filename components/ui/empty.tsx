import Image from "next/image";

interface EmptyProps {
  label: string;
  imageSrc?: string;
}

export const Empty = ({ 
  label,
  imageSrc = "/empty.png"
}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-[500px] w-[500px]">
        <Image
            alt="Empty"
            fill
            src={imageSrc}
            className="object-contain"
        />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  );
};