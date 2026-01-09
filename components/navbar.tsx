
import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
   const apiLimitCount = await getApiLimitCount();
   const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4 bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 border-b border-violet-200 shadow-sm">
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        <div className="flex w-full justify-end">
           <UserButton afterSignOutUrl="/" />
        </div>
    </div>
   );
};
 
export default Navbar;