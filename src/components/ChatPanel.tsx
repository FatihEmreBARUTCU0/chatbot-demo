"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble, { type Message } from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import ChatInput from "@/components/ChatInput";

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "bot",
  text: "Merhaba! Ben ShopBot. Sipariş takibi, iade veya başka bir konuda yardımcı olabilirim. Ne yapmak istersiniz?",
  timestamp: new Date(),
};

const SUGGESTIONS = [
  "Siparişimi takip etmek istiyorum",
  "İade yapmak istiyorum",
  "Temsilciye bağlan",
  "İletişim bilgileri",
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setShowSuggestions(false);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = (await response.json()) as { reply?: string };
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: data.reply ?? "Şu anda yanıt üretilemedi. Lütfen tekrar deneyin.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: "Şu anda servisimize ulaşılamıyor. Lütfen kısa süre sonra tekrar deneyin.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            SB
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-zinc-900">ShopBot Destek</p>
          <p className="text-xs text-emerald-600 font-medium">● Çevrimiçi — Ortalama yanıt: &lt;2 sn</p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full border border-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          7/24 Aktif
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Suggestion chips — visible only before first user message */}
        {showSuggestions && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:border-violet-300 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 text-xs font-bold">
              SB
            </div>
            <TypingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => sendMessage(input)}
          disabled={isTyping}
          placeholder="Mesajınızı yazın... (Enter ile gönderin)"
        />
        <p className="text-center text-[11px] text-zinc-400 pb-2.5">
          ShopBot · Groq AI ile güçlendirilmiştir
        </p>
      </div>
    </div>
  );
}
