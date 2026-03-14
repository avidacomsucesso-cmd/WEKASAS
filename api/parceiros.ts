import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const { name, email, phone, country, region, partnerType } =
    (req.body ?? {}) as Record<string, any>;

  if (!name || !email || !phone || !country || !region || !partnerType) {
    res.status(400).json({ ok: false, error: "Dados em falta." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, error: "RESEND_API_KEY não está configurada." });
    return;
  }

  const notificationEmail = "wekasasadm@gmail.com";
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
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

    await resend.emails.send({
      from: "WEKASAS <onboarding@resend.dev>",
      to: [email],
      subject: "Recebemos o teu cadastro — WEKASAS",
      text: [
        `Olá ${name},`,
        "",
        "Obrigado pelo teu interesse em ser parceiro WEKASAS.",
        "Vamos contactar-te em breve para explicar os próximos passos.",
        "",
        "Qualquer dúvida, estamos disponíveis:",
        "Email: contacto@wekasas.com",
        "WhatsApp: +351 96 252 5307",
        "",
        "WEKASAS — O seu imóvel. A nossa responsabilidade.",
        "wekasas.com",
      ].join("\n"),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).json({ ok: false, error: "Erro ao enviar email." });
  }
}
