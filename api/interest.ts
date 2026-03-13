import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const { name, email, phone, message, listingTitle, listingCity } =
    (req.body ?? {}) as Record<string, any>;

  if (!name || !email || !phone || !listingTitle) {
    res.status(400).json({ ok: false, error: "Dados em falta." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, error: "RESEND_API_KEY não está configurada." });
    return;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || "wekasas@wekasas.com";
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "WEKASAS <onboarding@resend.dev>",
    to: [notificationEmail],
    subject: `Interesse em arrendamento — ${listingTitle}`,
    replyTo: email,
    text: [
      `Imóvel: ${listingTitle}`,
      listingCity ? `Cidade: ${listingCity}` : "",
      "",
      `Nome: ${name}`,
      `Email: ${email}`,
      `Telefone: ${phone}`,
      message ? `Mensagem: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  await resend.emails.send({
    from: "WEKASAS <onboarding@resend.dev>",
    to: [email],
    subject: "Recebemos o teu interesse — WEKASAS",
    text: [
      `Olá ${name},`,
      "",
      "Obrigado pelo teu interesse. Vamos responder o mais rapidamente possível.",
      "",
      `Imóvel: ${listingTitle}`,
      listingCity ? `Cidade: ${listingCity}` : "",
      "",
      "WEKASAS",
    ].join("\n"),
  });

  res.status(200).json({ ok: true });
}
