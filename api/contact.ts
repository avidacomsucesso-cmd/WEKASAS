import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const {
    name,
    email,
    phone,
    city,
    typology,
    expectedRent,
    message,
  } = (req.body ?? {}) as Record<string, any>;

  if (!name || !email || !phone || !city || !typology || !expectedRent) {
    res.status(400).json({ ok: false, error: "Dados em falta." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, error: "RESEND_API_KEY não está configurada." });
    return;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || "contacto@wekasas.com";
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "WEKASAS <onboarding@resend.dev>",
    to: [notificationEmail],
    subject: `Novo pedido de avaliação — ${name}`,
    replyTo: email,
    text: [
      `Nome: ${name}`,
      `Email: ${email}`,
      `Telefone: ${phone}`,
      `Cidade: ${city}`,
      `Tipologia: ${typology}`,
      `Renda esperada: ${expectedRent}€`,
      message ? `Mensagem: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  await resend.emails.send({
    from: "WEKASAS <onboarding@resend.dev>",
    to: [email],
    subject: "Recebemos o teu pedido — WEKASAS",
    text: [
      `Olá ${name},`,
      "",
      "Recebemos o teu pedido de avaliação gratuita.",
      "Vamos contactar em menos de 24 horas.",
      "",
      "WEKASAS — O seu imóvel. A nossa responsabilidade.",
    ].join("\n"),
  });

  res.status(200).json({ ok: true });
}