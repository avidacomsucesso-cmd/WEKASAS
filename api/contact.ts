import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const {
    name,
    email,
    phone,
    country,
    region,
    typology,
    expectedRent,
    message,
  } = (req.body ?? {}) as Record<string, any>;

  const apiKey = process.env.RESEND_API_KEY || "re_KiFLajpT_MvtBd2SB5hGV7DL7f5qWbqu7";

  if (!name || !email || !phone || !country || !region || !typology || !expectedRent) {
    res.status(400).json({ ok: false, error: "Dados em falta." });
    return;
  }

  const notificationEmail = "wekasasadm@gmail.com";
  const resend = new Resend(apiKey);

  try {
    // Read HTML template
    const templatePath = path.join(process.cwd(), "api/templates/email_proprietario.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    // Dynamic replacements
    htmlContent = htmlContent
      .replace(/\{\{nome\}\}/g, name)
      .replace(/\{\{cidade\}\}/g, region)
      .replace(/\{\{pais\}\}/g, country);

    // Internal Notification (Plain Text)
    await resend.emails.send({
      from: "WEKASAS <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `Novo pedido de avaliação — ${name}`,
      replyTo: email,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Telefone: ${phone}`,
        `País: ${country}`,
        `Região/Distrito: ${region}`,
        `Tipologia: ${typology}`,
        `Renda esperada: ${expectedRent}€`,
        message ? `Mensagem: ${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Auto-reply to Lead (HTML)
    await resend.emails.send({
      from: "WEKASAS <onboarding@resend.dev>",
      to: [email],
      subject: "Recebemos o teu pedido — WEKASAS",
      html: htmlContent,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).json({ ok: false, error: "Erro ao enviar email." });
  }
}