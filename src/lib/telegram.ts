// src/lib/telegram.ts

export async function sendTelegramMessage(message: string) {
  try {
    const isServer = typeof window === "undefined";

    const url = isServer
      ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/telegram/send`
      : "/api/telegram/send";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to send Telegram message:", errText);
    } else {
      console.log("Message sent successfully!");
    }
  } catch (err) {
    console.error("Failed to send Telegram message:", err);
  }
}
