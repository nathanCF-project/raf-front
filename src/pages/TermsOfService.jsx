// my-react-app/src/pages/TermsOfService.jsx

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Termos de Serviço</h1>
            {/* Usar o locale 'pt-PT' para garantir o formato de data português */}
            <p className="text-lg text-gray-600">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
          </div>

          {/* Introdução */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              1. Introdução
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Bem-vindo(a) ao nosso website. Estes Termos de Serviço ("Termos") regem a sua utilização do nosso website e serviços.
                Ao aceder ou utilizar o nosso website, concorda em ficar vinculado(a) a estes Termos.
                Se não concordar com estes Termos, por favor, não utilize o nosso website.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações serão eficazes
                imediatamente após a sua publicação. A sua utilização continuada do website após quaisquer alterações constitui
                aceitação dos novos Termos.
              </p>
            </div>
          </section>

          {/* Utilização do Website */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              2. Utilização do Website
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Pode utilizar o nosso website apenas para fins legais. Concorda em não utilizar o website:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>De qualquer forma que viole as leis ou regulamentos aplicáveis.</li>
                <li>Para transmitir ou enviar comunicações comerciais não solicitadas.</li>
                <li>Para se fazer passar por qualquer pessoa ou entidade ou deturpar a sua afiliação.</li>
                <li>Para interferir ou interromper o website ou os servidores.</li>
                <li>Para tentar obter acesso não autorizado a qualquer parte do website.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Reservamo-nos o direito de terminar ou suspender o seu acesso ao website a qualquer momento,
                sem aviso prévio, por conduta que consideremos violadora destes Termos ou prejudicial
                a outros utilizadores, a nós ou a terceiros.
              </p>
            </div>
          </section>

          {/* Propriedade Intelectual */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              3. Propriedade Intelectual
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                O website e o seu conteúdo original, funcionalidades e características são propriedade da Rafeira
                e estão protegidos por leis internacionais de direitos de autor, marcas registadas, patentes, segredos comerciais e outras
                leis de propriedade intelectual.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não pode reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente,
                executar publicamente, republicar, descarregar, armazenar ou transmitir qualquer material
                do nosso website, exceto conforme permitido por estes Termos ou com o nosso consentimento prévio por escrito.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Qualquer feedback, comentários ou sugestões que nos forneça relativamente ao website podem ser utilizados
                por nós sem qualquer obrigação de compensação.
              </p>
            </div>
          </section>

          {/* Responsabilidades do Utilizador */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              4. Responsabilidades do Utilizador
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Como utilizador do nosso website, é responsável por:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Manter a confidencialidade das suas credenciais de conta (se aplicável).</li>
                <li>Todas as atividades que ocorrem sob a sua conta (se aplicável).</li>
                <li>Garantir que a sua utilização cumpre as leis aplicáveis.</li>
                <li>Fornecer informações precisas e completas quando solicitado.</li>
                <li>Notificar-nos prontamente sobre qualquer utilização não autorizada da sua conta (se aplicável).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Concorda em indemnizar e isentar-nos de quaisquer reclamações, danos ou despesas
                resultantes da sua utilização do website ou violação destes Termos.
              </p>
            </div>
          </section>

          {/* Exclusão de Responsabilidade */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              5. Exclusão de Responsabilidade
            </h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-yellow-800 font-medium">
                  IMPORTANTE: Por favor, leia esta secção cuidadosamente, pois ela limita a nossa responsabilidade.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                O website é fornecido "TAL COMO ESTÁ" e "CONFORME DISPONÍVEL". Não fazemos
                quaisquer declarações ou garantias de qualquer tipo, expressas ou implícitas, relativamente à
                operação do website ou à informação, conteúdo ou materiais incluídos.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Na extensão máxima permitida por lei, renunciamos a todas as garantias, expressas ou
                implícitas, incluindo, mas não se limitando a, garantias implícitas de comercialização e
                adequação a um fim específico.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Não seremos responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou
                punitivos, incluindo, mas não se limitando a, perda de lucros, dados ou uso,
                resultantes da sua utilização do website.
              </p>
            </div>
          </section>

          {/* Lei Aplicável */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              6. Lei Aplicável
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Estes Termos serão regidos e interpretados de acordo com as leis de
                **Portugal**, sem consideração aos seus conflitos de disposições legais.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Quaisquer disputas decorrentes ou relacionadas com estes Termos estarão sujeitas à
                jurisdição exclusiva dos tribunais localizados em **Setúbal, Portugal**.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Se qualquer disposição destes Termos for considerada inexequível ou inválida, essa
                disposição será limitada ou eliminada na extensão mínima necessária para que
                estes Termos permaneçam, de outra forma, em pleno vigor e efeito.
              </p>
            </div>
          </section>

          {/* Informações de Contacto */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacte-nos</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-2">
                Se tiver alguma questão sobre estes Termos de Serviço, por favor, contacte-nos:
              </p>
              <div className="text-gray-600">
                <p>Email: <a href="mailto:arafeira.estruturadecriacao@gmail.com" className="text-blue-600 hover:underline">arafeira.estruturadecriacao@gmail.com</a></p>
                {/* Como não temos um endereço físico específico da empresa, podemos omitir ou usar algo genérico se necessário. */}
                {/* <p>Address: [Seu Endereço da Empresa]</p> */}
                <p>Telefone: <a href="tel:+351962185565" className="text-blue-600 hover:underline">+351 962 185 565</a> / <a href="tel:+351961200611" className="text-blue-600 hover:underline">+351 961 200 611</a></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}