import { SignalHigh } from "lucide-react";
import { WifiHigh } from "lucide-react";

export default function Logo() {
  return (
    <div className="relative w-full text-black">
      <div className="h-8 relative">
        <div className="bg-black w-24 h-5 rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0" />

        <div className="flex justify-between items-center px-3 absolute top-0.5 left-0 right-0">
          <span className="px-2 pt-2 font-medium">9:41</span>
          <div className="flex space-x-1">
            <SignalHigh className="w-6 h-6" strokeWidth={3} />
            <WifiHigh className="w-6 h-6" strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="flex  justify-center items-center p-6  bg-[var(--primary-white)] rounded-b-2xl space-x-2">
        <img src="/pmlogo.svg" alt="Plant Mate" className="h-8 w-auto" />
      </div>
    </div>
  );
}
