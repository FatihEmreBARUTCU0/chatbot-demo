export async function sendToGrok(message: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Sen ShopBot'sun, bir e-ticaret firmasının müşteri hizmetleri asistanısın. Sipariş takibi, iade, fiyat konularında yardımcı olursun. Türkçe konuş, kısa ve net cevap ver.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(data.error?.message ?? "Groq API error");
  }

  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Groq API returned empty response");
  }

  return text;
}
