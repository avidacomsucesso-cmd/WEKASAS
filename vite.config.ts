import { defineConfig, type Plugin } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { Resend } from "resend";

function readJsonBody(req: import("http").IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function wekasasApiMiddleware(): Plugin {
  return {
    name: "wekasas-api-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();

        res.setHeader("Content-Type", "application/json; charset=utf-8");

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
          return;
        }

        try {
          const resendKey = process.env.RESEND_API_KEY || "re_KiFLajpT_MvtBd2SB5hGV7DL7f5qWbqu7";
          const notificationEmail = "wekasasadm@gmail.com";

          if (req.url === "/api/contact") {
            const payload = await readJsonBody(req);
            const { name, email, phone, country, region, typology, expectedRent, message } = payload ?? {};

            if (!name || !email || !phone || !country || !region || !typology || !expectedRent) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: "Dados em falta." }));
              return;
            }

            if (!resendKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ ok: false, error: "RESEND_API_KEY não configurada." }));
              return;
            }

            const resend = new Resend(resendKey);

            await resend.emails.send({
              from: "WEKASAS <onboarding@resend.dev>",
              to: [notificationEmail],
              subject: `Novo pedido de avaliação — ${name}`,
              replyTo: email,
              text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nPaís: ${country}\nRegião: ${region}\nTipologia: ${typology}\nRenda: ${expectedRent}€\nMensagem: ${message || ""}`,
            });

            await resend.emails.send({
              from: "WEKASAS <onboarding@resend.dev>",
              to: [email],
              subject: "Recebemos o teu pedido — WEKASAS",
              text: `Olá ${name},\n\nRecebemos o teu pedido de avaliação gratuita.\nVamos contactar em menos de 24 horas.\n\nQualquer dúvida, estamos disponíveis:\nEmail: contacto@wekasas.com\nWhatsApp: +351 96 252 5307\n\nWEKASAS — O seu imóvel. A nossa responsabilidade.\nwekasas.com`,
            });

            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (req.url === "/api/parceiros") {
            const payload = await readJsonBody(req);
            const { name, email, phone, country, region, partnerType } = payload ?? {};

            if (!name || !email || !phone || !country || !region || !partnerType) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: "Dados em falta." }));
              return;
            }

            if (!resendKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ ok: false, error: "RESEND_API_KEY não configurada." }));
              return;
            }

            const resend = new Resend(resendKey);

            await resend.emails.send({
              from: "WEKASAS <onboarding@resend.dev>",
              to: [notificationEmail],
              subject: `Novo parceiro WEKASAS — ${name} (${partnerType})`,
              replyTo: email,
              text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nTipo: ${partnerType}\nPaís: ${country}\nRegião: ${region}`,
            });

            await resend.emails.send({
              from: "WEKASAS <onboarding@resend.dev>",
              to: [email],
              subject: "Recebemos o teu cadastro — WEKASAS",
              text: `Olá ${name},\n\nObrigado pelo teu interesse em ser parceiro WEKASAS.\nVamos contactar-te em breve.\n\nQualquer dúvida, estamos disponíveis:\nEmail: contacto@wekasas.com\nWhatsApp: +351 96 252 5307\n\nWEKASAS\nwekasas.com`,
            });

            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ ok: false, error: "Not found" }));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: "Erro inesperado." }));
        }
      });
    },
  };
}

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    "import.meta.env.NEXT_PUBLIC_WHATSAPP": JSON.stringify(
      process.env.NEXT_PUBLIC_WHATSAPP || "351962525307"
    ),
  },
  plugins: [dyadComponentTagger(), react(), wekasasApiMiddleware()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));