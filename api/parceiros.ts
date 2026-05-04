import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const body = await req.json();
  const { name, email, phone, country, region, partnerType } = body;

  const apiKey = process.env.RESEND_API_KEY;

  if (!name || !email || !phone || !country || !region || !partnerType) {
    res.status(400).json({ ok: false, error: "Dados em falta." });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ ok: false, error: "RESEND_API_KEY não está configurada no servidor." });
    return;
  }

  const notificationEmail = "contacto@wekasas.com";
  const resend = new Resend(apiKey);

  try {
    // Read HTML template
    const templatePath = path.join(process.cwd(), "api/templates/email_parceiro.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    // Dynamic replacements
    const partnerTypeLabel = partnerType === "indicador" 
      ? "Indicador de Imóveis" 
      : "Consultor Parceiro";

    htmlContent = htmlContent
      .replace(/\{\{nome\}\}/g, name)
      .replace(/\{\{tipo_parceiro\}\}/g, partnerTypeLabel);

    // Internal Notification (Plain Text)
    await resend.emails.send({
      from: "WEKASAS <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `Novo parceiro WEKASAS — ${name} (${partnerType})`,
      replyTo: email,
      text: [
        `Novo Cadastro de Parceiro:`,
        "",
        `Nome: ${name}`,
        `Email: ${email}`,
        `Telefone: ${phone}`,
        `Tipo de parceiro: ${partnerType}`,
        `País: ${country}`,
        `Região/Distrito: ${region}`,
      ].join("\n"),
    });

    // Welcome email to Partner (HTML)
    await resend.emails.send({
      from: "WEKASAS <onboarding@resend.dev>",
      to: [email],
      subject: "Bem-vindo ao programa Parceiros — WEKASAS",
      html: htmlContent,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).json({ ok: false, error: "Erro ao enviar email." });
  }
}