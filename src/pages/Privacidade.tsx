import { PageMeta } from "@/components/PageMeta";

export default function Privacidade() {
  return (
    <>
      <PageMeta
        title="Política de Privacidade — WEKASAS"
        description="Informação sobre como a HEAVENWHISPER UNIPESSOAL, LDA trata os teus dados pessoais."
        path="/privacidade"
      />

      <section className="bg-white">
        <div className="wk-container py-16 sm:py-24">
          <div className="mx-auto max-w-[720px]">
            <h1 className="text-4xl font-bold tracking-tight text-[#212121] sm:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-4 text-sm font-medium text-zinc-500">
              Última actualização: Março de 2025
            </p>

            <div className="mt-12 space-y-10">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  1. Identificação do Responsável pelo Tratamento
                </h2>
                <div className="mt-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    HEAVENWHISPER UNIPESSOAL, LDA, com sede na Rua dos Malhões, Quinta da Fonte, 2770-071 Paço de Arcos, Lisboa, Portugal, NIF 517 714 140, a operar sob a marca WEKASAS (wekasas.com).
                  </p>
                  <p className="mt-2">
                    Contacto para questões de privacidade: <a href="mailto:contacto@wekasas.com" className="text-[#FA621C] font-semibold hover:underline">contacto@wekasas.com</a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  2. Que dados pessoais recolhemos
                </h2>
                <div className="mt-4 text-base leading-relaxed text-zinc-600">
                  <p>Recolhemos apenas os dados que nos forneces directamente através dos nossos formulários:</p>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Nome completo</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone</li>
                    <li>Cidade de residência ou localização do imóvel</li>
                    <li>Informações sobre o imóvel (tipologia, renda esperada)</li>
                    <li>Dados de navegação (páginas visitadas, tempo de sessão) recolhidos via cookies de análise, com o teu consentimento.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  3. Finalidade e base legal do tratamento
                </h2>
                <div className="mt-4 text-base leading-relaxed text-zinc-600">
                  <p>Os teus dados são tratados para:</p>
                  <ul className="mt-2 space-y-2">
                    <li>— Responder ao teu pedido de avaliação ou informação (base legal: execução de contrato / pré-contrato — Art. 6.º, n.º 1, al. b) do RGPD)</li>
                    <li>— Enviar comunicações sobre o serviço WEKASAS, quando autorizado (base legal: consentimento — Art. 6.º, n.º 1, al. a) do RGPD)</li>
                    <li>— Melhorar o nosso website e serviço (base legal: interesse legítimo — Art. 6.º, n.º 1, al. f) do RGPD)</li>
                  </ul>
                  <p className="mt-4 font-semibold text-zinc-900">Nunca vendemos os teus dados a terceiros nem os utilizamos para fins não declarados.</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  4. Conservação dos dados
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-600">
                  Os teus dados são conservados pelo período necessário para a finalidade para que foram recolhidos, ou enquanto mantiveres relação contratual com a WEKASAS. Após pedido de eliminação, os dados são apagados no prazo máximo de 30 dias úteis.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  5. Os teus direitos (RGPD)
                </h2>
                <div className="mt-4 text-base leading-relaxed text-zinc-600">
                  <p>Tens direito a, a qualquer momento:</p>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Aceder aos teus dados pessoais</li>
                    <li>Rectificar dados incorrectos ou incompletos</li>
                    <li>Solicitar a eliminação dos teus dados ("direito ao esquecimento")</li>
                    <li>Opor-te ao tratamento ou solicitar a sua limitação</li>
                    <li>Receber os teus dados em formato portátil</li>
                    <li>Apresentar reclamação à CNPD (Comissão Nacional de Protecção de Dados): <a href="https://www.cnpd.pt" target="_blank" className="text-[#FA621C] hover:underline">www.cnpd.pt</a></li>
                  </ul>
                  <p className="mt-4">Para exercer qualquer direito: <a href="mailto:contacto@wekasas.com" className="text-[#FA621C] font-semibold hover:underline">contacto@wekasas.com</a></p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  6. Cookies
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-600">
                  Utilizamos cookies essenciais (necessários para o funcionamento do site) e, com o teu consentimento, cookies de análise para compreender como o site é utilizado. Podes gerir as tuas preferências através do banner de cookies apresentado na primeira visita.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  7. Subcontratantes e transferência de dados
                </h2>
                <div className="mt-4 text-base leading-relaxed text-zinc-600">
                  <p>Os teus dados podem ser tratados pelos seguintes prestadores de serviços, que actuam sob acordo de protecção de dados compatível com o RGPD:</p>
                  <ul className="mt-2 space-y-1">
                    <li>— Vercel Inc. (alojamento do website — EUA, com cláusulas contratuais padrão)</li>
                    <li>— Resend (envio de emails transaccionais)</li>
                  </ul>
                  <p className="mt-4">Não são realizadas outras transferências internacionais de dados.</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                  8. Segurança
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-600">
                  Adoptamos medidas técnicas e organizacionais adequadas para proteger os teus dados contra acesso não autorizado, perda ou destruição, incluindo transmissão cifrada via HTTPS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
