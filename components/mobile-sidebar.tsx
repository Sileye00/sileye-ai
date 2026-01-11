"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
       <SheetTrigger asChild>
         <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
         </Button>
       </SheetTrigger>
       <SheetContent side="left" className="p-0">
         <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} onNavigate={() => setOpen(false)} />
       </SheetContent>
    </Sheet>
    );
  }

export default MobileSidebar;