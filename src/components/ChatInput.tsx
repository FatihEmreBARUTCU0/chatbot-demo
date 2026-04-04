"use client";

import { type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function ChatInput({ value, onChange, onSend, disabled, placeholder }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-2 px-4 py-3 border-t border-zinc-200 bg-white">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder ?? "Mesajınızı yazın... (Enter ile gönderin)"}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 placeholder:text-zinc-400 disabled:opacity-50 max-h-28 overflow-y-auto"
      />
      <Button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        size="icon-lg"
        className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white border-0 flex-shrink-0 disabled:opacity-40"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </Button>
    </div>
  );
}
