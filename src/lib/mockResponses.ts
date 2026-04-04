export type ConversationState =
  | "idle"
  | "awaiting_order_number"
  | "awaiting_return_item";

export type BotResponse = {
  text: string;
  nextState: ConversationState;
};

function buildOrderDetails(input: string): string {
  const match = input.match(/#?(\d{4,8})/);
  const num = match ? match[1] : "00001";
  return [
    "Siparişiniz bulundu! 📦",
    "",
    `Sipariş No: #${num}`,
    "Durum: Kargoda",
    "Kargo: MNG Kargo",
    `Takip No: MNG${num.padStart(9, "0")}`,
    "Tahmini Teslimat: Yarın, 18:00'a kadar",
    "",
    "Başka yardımcı olabilir miyim?",
  ].join("\n");
}

export function getBotResponse(message: string, state: ConversationState): BotResponse {
  const msg = message.toLowerCase();

  // ── State-based checks run first ────────────────────────────────────

  if (state === "awaiting_order_number") {
    return { text: buildOrderDetails(message), nextState: "idle" };
  }

  if (state === "awaiting_return_item") {
    return {
      text: `"${message.trim()}" için iade talebiniz alındı.\n\n3-5 iş günü içinde ücret iade edilecektir. İşlemi hesabınızın "Siparişlerim" bölümünden takip edebilirsiniz.\n\nBaşka yardımcı olabilir miyim?`,
      nextState: "idle",
    };
  }

  // ── Idle keyword matching ────────────────────────────────────────────

  if (msg.includes("sipariş") || msg.includes("kargo")) {
    return {
      text: "Sipariş numaranızı paylaşır mısınız?",
      nextState: "awaiting_order_number",
    };
  }

  if (msg.includes("iade")) {
    return {
      text: "Hangi ürünü iade etmek istiyorsunuz?",
      nextState: "awaiting_return_item",
    };
  }

  if (msg.includes("merhaba") || msg.includes("selam")) {
    return {
      text: "Merhaba! Ben ShopBot. Sipariş takibi, iade veya başka bir konuda yardımcı olabilirim. Ne yapmak istersiniz?",
      nextState: "idle",
    };
  }

  if (msg.includes("teşekkür") || msg.includes("sağol")) {
    return {
      text: "Rica ederiz! Başka yardımcı olabilir miyim? 😊",
      nextState: "idle",
    };
  }

  if (msg.includes("insan") || msg.includes("temsilci") || msg.includes("yetkili")) {
    return {
      text: "Sizi bir temsilciye bağlıyorum, lütfen bekleyin...\n\nTahmini bekleme süreniz: ~3 dakika.",
      nextState: "idle",
    };
  }

  if (msg.includes("iletişim") || msg.includes("telefon") || msg.includes("mail")) {
    return {
      text: "Bize şu kanallardan ulaşabilirsiniz:\n\n📞 0850 123 45 67 (Hafta içi 09:00–20:00)\n📧 destek@shopbot.com.tr",
      nextState: "idle",
    };
  }

  // ── Fallback ─────────────────────────────────────────────────────────

  return {
    text: "Sipariş takibi veya iade konusunda yardımcı olabilirim. Hangisi için yardım istersiniz?",
    nextState: "idle",
  };
}
