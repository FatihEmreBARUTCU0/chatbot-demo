import { cn } from "@/lib/utils";

export type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp?: Date;
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
          isUser
            ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
            : "bg-zinc-200 text-zinc-600"
        )}
      >
        {isUser ? "SİZ" : "SB"}
      </div>

      <div className={cn("flex flex-col gap-1 max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line",
            isUser
              ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-2xl rounded-tr-sm"
              : "bg-zinc-100 text-zinc-800 rounded-2xl rounded-tl-sm"
          )}
        >
          {message.text}
        </div>
        {message.timestamp && (
          <span className="text-[11px] text-zinc-400">{formatTime(message.timestamp)}</span>
        )}
      </div>
    </div>
  );
}
