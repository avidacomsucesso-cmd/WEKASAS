import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const data = await req.json();
    const notificationEmail = "contacto@wekasas.com";

    // 1. Notificar WEKASAS
    await resend.emails.send({
      from: "WEKASAS <leads@wekasas.com>",
      to: notificationEmail,
      subject: `Novo Inquilino: ${data.nome} — ${data.cidade}`,
      html: `
        <h2>Novo Perfil de Inquilino Submetido</h2>
        <table border="1" cellpadding="8" style="border-collapse: collapse; font-family: sans-serif;">
          <tr><td><b>Nome</b></td><td>${data.nome}</td></tr>
          <tr><td><b>Email</b></td><td>${data.email}</td></tr>
          <tr><td><b>Telefone</b></td><td>${data.prefixo} ${data.telefone}</td></tr>
          <tr><td><b>Perfil</b></td><td>${data.perfil}</td></tr>
          <tr><td><b>Cidade</b></td><td>${data.cidade}</td></tr>
          <tr><td><b>Tipologia</b></td><td>${data.tipologia.join(', ')}</td></tr>
          <tr><td><b>Orçamento max.</b></td><td>€${data.orcamentoMax}/mês</td></tr>
          <tr><td><b>Entrada</b></td><td>${data.dataEntrada}</td></tr>
          <tr><td><b>Situação laboral</b></td><td>${data.situacaoLaboral}</td></tr>
          <tr><td><b>Rendimento</b></td><td>${data.rendimentoRange}</td></tr>
          <tr><td><b>Fiador</b></td><td>${data.temFiador}</td></tr>
          <tr><td><b>Observações</b></td><td>${data.observacoes}</td></tr>
        </table>
      `,
    });

    // 2. Email de confirmação ao inquilino
    await resend.emails.send({
      from: "WEKASAS <contacto@wekasas.com>",
      to: data.email,
      subject: "WEKASAS — Recebemos o seu perfil!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #EEE; border-radius: 16px; overflow: hidden;">
          <div style="background: #212121; padding: 24px; text-align: center;">
            <img src="https://wekasas.com/assets/wekasas-logo-official.png" alt="WEKASAS" style="height: 40px;">
          </div>
          <div style="padding: 32px; color: #333;">
            <h2 style="color: #212121; margin-top: 0;">Olá, ${data.nome}!</h2>
            <p>Recebemos o seu perfil de inquilino e vamos analisá-lo com toda a atenção.</p>
            <p>A nossa equipa vai contactá-lo(a) em até <b>24 horas</b> com opções exclusivas selecionadas para si, incluindo imóveis off-market que não aparecem nos portais habituais.</p>
            
            <div style="background: #FFF3EE; border-left: 4px solid #FA621C; padding: 20px; margin: 24px 0; border-radius: 4px;">
              <b style="color: #FA621C; font-size: 14px; text-transform: uppercase;">Resumo da sua pesquisa:</b><br>
              <p style="margin: 10px 0 0; font-size: 15px;">
                📍 <b>Cidade:</b> ${data.cidade}<br>
                🏠 <b>Tipologia:</b> ${data.tipologia.join(', ')}<br>
                💶 <b>Orçamento:</b> até €${data.orcamentoMax}/mês
              </p>
            </div>

            <p style="color: #666; font-size: 14px; line-height: 1.6;">O seu imóvel. A nossa responsabilidade.</p>
          </div>
          <div style="background: #F7F7F7; padding: 20px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #EEE;">
            WEKASAS · <a href="mailto:contacto@wekasas.com" style="color: #FA621C; text-decoration: none;">contacto@wekasas.com</a> · +351 928 202 241<br>
            Lisboa · Porto · Madrid · Barcelona
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting tenant form:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
