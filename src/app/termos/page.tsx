import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata = {
  title: "Termos de uso e privacidade — Academia Tia Lu",
};

const secoes = [
  {
    titulo: "1. Quem somos",
    corpo: [
      "A Academia Tia Lu é uma plataforma de assinatura com cursos, materiais pra baixar e comunidade, voltada a tias de igreja, professoras de EBD e educadoras que ensinam crianças. Estes termos explicam como o serviço funciona e como tratamos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).",
    ],
  },
  {
    titulo: "2. Dados que coletamos",
    corpo: [
      "Pra criar e manter sua conta, coletamos: nome completo, e-mail e senha (armazenada de forma criptografada — nem a nossa equipe consegue vê-la).",
      "Pra processar a assinatura, coletamos seu CPF ou CNPJ, exigido pela legislação de pagamentos. Ele é compartilhado apenas com o Asaas, nossa processadora de pagamentos.",
      "Opcionalmente, você pode informar telefone, data de nascimento e foto de perfil nas configurações. Esses dados não são obrigatórios.",
      "Pra aplicar a regra de um dispositivo por conta, registramos um identificador do aparelho em que você fez login.",
      "Conteúdos que você publica na comunidade (posts, comentários e curtidas) ficam associados ao seu nome e visíveis para as demais assinantes.",
    ],
  },
  {
    titulo: "3. Pra que usamos seus dados",
    corpo: [
      "Usamos seus dados exclusivamente pra: (a) autenticar seu acesso; (b) processar a cobrança da assinatura de R$ 29,90/mês; (c) exibir sua identificação na comunidade; (d) enviar e-mails operacionais, como confirmação de conta e recuperação de senha; e (e) garantir a segurança da plataforma.",
      "Não vendemos nem compartilhamos seus dados com terceiros pra fins de publicidade.",
    ],
  },
  {
    titulo: "4. Com quem compartilhamos",
    corpo: [
      "Asaas Gestão Financeira S.A. — processa os pagamentos da assinatura (recebe nome, e-mail e CPF/CNPJ).",
      "Supabase — infraestrutura de banco de dados e autenticação onde suas informações ficam armazenadas.",
      "Vercel — hospedagem da aplicação.",
      "Esses fornecedores atuam como operadores de dados e seguem suas próprias políticas de segurança e conformidade.",
    ],
  },
  {
    titulo: "5. Seus direitos (LGPD)",
    corpo: [
      "Você pode, a qualquer momento: confirmar que tratamos seus dados; acessar e corrigir seus dados (diretamente em Perfil → Configurações); solicitar a exclusão da conta e dos dados associados; e revogar consentimentos.",
      "Pra exercer qualquer direito que não esteja disponível na própria plataforma, escreva pra tialu.mentora@gmail.com. Responderemos no prazo previsto pela LGPD.",
    ],
  },
  {
    titulo: "6. Assinatura, cancelamento e reembolso",
    corpo: [
      "A assinatura custa R$ 29,90 por mês e renova automaticamente. Em caso de não pagamento, o acesso ao conteúdo é suspenso até a regularização.",
      "Você pode cancelar quando quiser — o acesso permanece ativo até o fim do período já pago.",
    ],
  },
  {
    titulo: "7. Uso da comunidade",
    corpo: [
      "A comunidade é um espaço de troca entre educadoras. Não são permitidos conteúdos ofensivos, discriminatórios ou que violem direitos de terceiros. Publicações podem ser removidas pela moderação, e contas que violarem estas regras podem ser suspensas.",
    ],
  },
  {
    titulo: "8. Propriedade do conteúdo",
    corpo: [
      "Os cursos, vídeos, PDFs e materiais da plataforma são de uso pessoal da assinante, para aplicação nas suas próprias turmas. Não é permitido revender, redistribuir ou republicar o conteúdo.",
    ],
  },
  {
    titulo: "9. Segurança e retenção",
    corpo: [
      "Usamos criptografia em trânsito (HTTPS) e em repouso, controle de acesso por linha no banco de dados e senhas com hash. Mantemos seus dados enquanto sua conta existir; após a exclusão, dados de cobrança podem ser retidos pelo prazo exigido pela legislação fiscal.",
    ],
  },
  {
    titulo: "10. Alterações destes termos",
    corpo: [
      "Podemos atualizar estes termos pra refletir melhorias da plataforma ou mudanças legais. Alterações relevantes serão comunicadas pelo e-mail cadastrado.",
    ],
  },
];

export default function TermosPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-cream px-6 py-12">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-3">
          <Logo size={40} />
          <span className="leading-tight">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-dark">
              Academia
            </span>
            <span className="block font-display text-lg font-bold text-ink">Tia Lu</span>
          </span>
        </Link>

        <h1 className="mt-8 font-display text-2xl font-bold text-ink md:text-3xl">
          Termos de uso e privacidade
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Última atualização: julho de 2026</p>

        <div className="mt-8 flex flex-col gap-8">
          {secoes.map((secao) => (
            <section key={secao.titulo}>
              <h2 className="font-display text-lg font-bold text-ink">{secao.titulo}</h2>
              {secao.corpo.map((paragrafo, i) => (
                <p key={i} className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {paragrafo}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-10 border-t border-ink/10 pt-6 text-center text-xs text-ink-soft">
          Dúvidas? Escreva pra{" "}
          <a href="mailto:tialu.mentora@gmail.com" className="underline underline-offset-4">
            tialu.mentora@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
