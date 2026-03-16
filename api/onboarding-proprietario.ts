import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { 
      name, email, phone, country, region, address, 
      typology, area, floor, parking, condition, 
      furnished, availableFrom, expectedRent, service,
      nif, iban, fiscalAddress
    } = body;

    const notificationEmail = process.env.NOTIFICATION_EMAIL || "wekasasadm@gmail.com";

    // 1. Notificar WEKASAS
    await resend.emails.send({
      from: "WEKASAS <onboarding@wekasas.com>",
      to: notificationEmail,
      subject: `Novo imóvel submetido — ${typology} em ${region}`,
      html: `
        <h1>Novo imóvel submetido</h1>
        <p><strong>DADOS DO IMÓVEL:</strong></p>
        <ul>
          <li>País: ${country}</li>
          <li>Região: ${region}</li>
          <li>Morada: ${address}</li>
          <li>Tipologia: ${typology}</li>
          <li>Área: ${area}m²</li>
          <li>Andar: ${floor}</li>
          <li>Estacionamento: ${parking}</li>
        </ul>
        <p><strong>CARACTERÍSTICAS:</strong></p>
        <ul>
          <li>Estado: ${condition}</li>
          <li>Mobilado: ${furnished}</li>
          <li>Disponível: ${availableFrom}</li>
          <li>Renda pretendida: ${expectedRent}€</li>
          <li>Serviço: ${service}</li>
        </ul>
        <p><strong>PROPRIETÁRIO:</strong></p>
        <ul>
          <li>Nome: ${name}</li>
          <li>NIF: ${nif}</li>
          <li>Telefone: ${phone}</li>
          <li>Email: ${email}</li>
          <li>IBAN: ${iban}</li>
          <li>Morada Fiscal: ${fiscalAddress}</li>
        </ul>
      `,
    });

    // 2. Email de boas-vindas ao proprietário
    // Usando o template mencionado
    await resend.emails.send({
      from: "WEKASAS <info@wekasas.com>",
      to: email,
      subject: "Recebemos o teu imóvel — WEKASAS",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #FA621C;">Olá ${name},</h2>
          <p>Obrigado por submeteres o teu imóvel em <strong>${region}, ${country}</strong> para avaliação da WEKASAS.</p>
          <p>Recebemos todos os dados com sucesso. O que acontece agora?</p>
          <ol>
            <li><strong>Avaliação de renda:</strong> Um dos nossos gestores vai analisar o mercado e o estado do imóvel.</li>
            <li><strong>Contacto em 24h:</strong> Entraremos em contacto para apresentar o valor sugerido e agendar a fotografia.</li>
            <li><strong>Fotografia e Publicação:</strong> Enviamos fotógrafo profissional sem qualquer custo para ti.</li>
          </ol>
          <p>Se tiveres alguma dúvida urgente, podes falar connosco via WhatsApp: <a href="https://wa.me/351962525307">+351 96 252 5307</a></p>
          <p>Até breve,<br>Equipa WEKASAS</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting property:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
