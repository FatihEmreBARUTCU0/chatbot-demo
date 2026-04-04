import LandingPanel from "@/components/LandingPanel";
import ChatPanel from "@/components/ChatPanel";

export default function Home() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="hidden md:block md:w-2/5 lg:w-[42%] flex-shrink-0">
        <LandingPanel />
      </div>
      <div className="flex flex-1 flex-col min-w-0 border-l border-zinc-200">
        <ChatPanel />
      </div>
    </div>
  );
}
