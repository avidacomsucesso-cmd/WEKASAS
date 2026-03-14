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
          if (req.url === "/api/contact") {
            const payload = await readJsonBody(req);

            const {
              name,
              email,
              phone,
              city,
              typology,
              expectedRent,
              message,
            } = payload ?? {};

            if (!name || !email || !phone || !city || !typology || !expectedRent) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: "Dados em falta." }));
              return;
            }

            const resendKey = process.env.RESEND_API_KEY;
            if (!resendKey) {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  ok: false,
                  error: "RESEND_API_KEY não está configurada.",
                })
              );
              return;
            }

            const notificationEmail =
              process.env.NOTIFICATION_EMAIL || "contacto@wekasas.com";

            const resend = new Resend(resendKey);

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

            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (req.url === "/api/interest") {
            const payload = await readJsonBody(req);
            const { name, email, phone, message, listingTitle, listingCity } =
              payload ?? {};

            if (!name || !email || !phone || !listingTitle) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: "Dados em falta." }));
              return;
            }

            const resendKey = process.env.RESEND_API_KEY;
            if (!resendKey) {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  ok: false,
                  error: "RESEND_API_KEY não está configurada.",
                })
              );
              return;
            }

            const notificationEmail =
              process.env.NOTIFICATION_EMAIL || "contacto@wekasas.com";

            const resend = new Resend(resendKey);

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
      process.env.NEXT_PUBLIC_WHATSAPP || ""
    ),
  },
  plugins: [dyadComponentTagger(), react(), wekasasApiMiddleware()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));