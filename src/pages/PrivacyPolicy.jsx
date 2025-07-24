function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-6 py-8 sm:px-8 sm:py-12">
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Política de Privacidade</h1>
            <p className="text-gray-600 text-lg">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
          </header>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">1. Introdução</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações
                pessoais quando você utiliza nossos serviços. Ao usar nossa plataforma, você concorda com as práticas
                descritas nesta política.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Estamos comprometidos em proteger sua privacidade e garantir que suas informações pessoais sejam
                tratadas de forma segura e responsável, em conformidade com a Lei Geral de Proteção de Dados (LGPD) e
                outras regulamentações aplicáveis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                2. Dados que Coletamos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Informações Pessoais:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Nome completo e informações de contato</li>
                  <li>Endereço de e-mail e número de telefone</li>
                  <li>Informações de perfil e preferências</li>
                  <li>Dados de localização (quando autorizado)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Dados Técnicos:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Endereço IP e informações do dispositivo</li>
                  <li>Dados de navegação e cookies</li>
                  <li>Logs de atividade e métricas de uso</li>
                  <li>Informações sobre o navegador e sistema operacional</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                3. Como Utilizamos seus Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos suas informações pessoais para os seguintes propósitos:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Prestação de Serviços</h3>
                  <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                    <li>Processar e gerenciar sua conta</li>
                    <li>Fornecer suporte ao cliente</li>
                    <li>Personalizar sua experiência</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 mb-2">Comunicação</h3>
                  <ul className="list-disc list-inside text-green-700 text-sm space-y-1">
                    <li>Enviar notificações importantes</li>
                    <li>Responder às suas solicitações</li>
                    <li>Compartilhar atualizações do serviço</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-800 mb-2">Melhorias</h3>
                  <ul className="list-disc list-inside text-purple-700 text-sm space-y-1">
                    <li>Analisar padrões de uso</li>
                    <li>Desenvolver novos recursos</li>
                    <li>Otimizar performance</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-orange-800 mb-2">Segurança</h3>
                  <ul className="list-disc list-inside text-orange-700 text-sm space-y-1">
                    <li>Prevenir fraudes</li>
                    <li>Detectar atividades suspeitas</li>
                    <li>Garantir conformidade legal</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                4. Retenção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos
                nesta política ou conforme exigido por lei.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Períodos de Retenção:</h3>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>
                    <strong>Dados de conta ativa:</strong> Enquanto sua conta estiver ativa
                  </li>
                  <li>
                    <strong>Dados de conta inativa:</strong> Até 2 anos após a última atividade
                  </li>
                  <li>
                    <strong>Dados de transações:</strong> 5 anos para fins fiscais e legais
                  </li>
                  <li>
                    <strong>Logs de segurança:</strong> 1 ano para investigações
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Após esses períodos, os dados são excluídos de forma segura ou anonimizados para análises estatísticas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                5. Seus Direitos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com a LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🔍 Acesso</h3>
                  <p className="text-gray-600 text-sm">
                    Solicitar informações sobre quais dados pessoais processamos sobre você.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">✏️ Correção</h3>
                  <p className="text-gray-600 text-sm">
                    Solicitar a correção de dados incompletos, inexatos ou desatualizados.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🗑️ Exclusão</h3>
                  <p className="text-gray-600 text-sm">
                    Solicitar a exclusão de dados pessoais desnecessários ou excessivos.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">📋 Portabilidade</h3>
                  <p className="text-gray-600 text-sm">Solicitar a portabilidade dos dados para outro fornecedor.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🚫 Oposição</h3>
                  <p className="text-gray-600 text-sm">Opor-se ao tratamento de dados em situações específicas.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">ℹ️ Informação</h3>
                  <p className="text-gray-600 text-sm">
                    Obter informações sobre o compartilhamento de dados com terceiros.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                6. Informações de Contato
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, entre em
                contato conosco:
              </p>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Encarregado de Dados (DPO)</h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <span className="font-medium mr-2">📧 E-mail:</span>
                        <a href="mailto:privacidade@empresa.com" className="text-blue-600 hover:text-blue-800">
                          @.com
                        </a>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium mr-2">📞 Telefone:</span>
                        <a href="tel:+5511999999999" className="text-blue-600 hover:text-blue-800">
                          +351 
                        </a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Endereço</h3>
                    <div className="text-gray-700">
                      <p>Rua , 123</p>
                      <p>Bairro </p>
                      <p>Portugal - PT</p>
                      <p>CEP: </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <p className="text-sm text-gray-600">
                    <strong>Tempo de resposta:</strong> Responderemos às suas solicitações em até 15 dias úteis,
                    conforme estabelecido pela LGPD.
                  </p>
                </div>
              </div>
            </section>

            <footer className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente para se
                manter informado sobre como protegemos suas informações.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy
