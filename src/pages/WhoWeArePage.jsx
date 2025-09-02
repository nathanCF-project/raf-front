//src/pages/WhoWeArePage.jsx (ou onde quer que você queira colocar este componente)

import React from 'react'; // Importar React é uma boa prática
import { Mail } from "lucide-react"; // Para o ícone de e-mail

import { useTranslation } from 'react-i18next';

// É importante que o componente Image seja do 'react' para aplicações SPA (Single Page Application)
// Se você está usando Next.js, 'next/image' é o correto.
// Como estamos em um projeto React padrão, usaremos um <img> tag simples por enquanto,
// ou uma biblioteca de imagem otimizada para React se for necessário.
// Para este exemplo, usaremos <img> e você pode substituir as `src` pelas suas imagens.

export default function AboutUs() {

  const { t, i18n } = useTranslation();


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6">{t('about.heroTitle')}</h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
             {t('about.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">{t('about.historyTitle')}</h2>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {t('about.historyP1')}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
               {t('about.historyP2')}
            </p>
          </div>
        </div>
      </section>

      {/* Key Pillars Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center">{t('about.pillarsTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Criação Artística - você pode substituir por um ícone de sua biblioteca de ícones ou SVG */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{t('about.pillar1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                 {t('about.pillar1Desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Formação */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{t('about.pillar2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.pillar2Desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Intercâmbios Culturais */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{t('about.pillar3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.pillar3Desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Defesa da Cultura */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.928 12c0 3.072 1.144 5.861 3.018 8.019M12 21.036V12"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{t('about.pillar4Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.pillar4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-founders Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center">{t('about.cofoundersTitle')}</h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Clara Passarinho */}
            <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
              <div className="flex flex-col items-center text-center mb-8">
                {/* Caminho da imagem para Clara Passarinho */}
                <img
                  src="images/clara.jpg" // SUGESTÃO: Coloque a imagem da Clara aqui (ex: public/images/clara_passarinho.jpg)
                  alt="Clara Passarinho"
                  width={200}
                  height={200}
                  className="rounded-full mb-6 object-cover aspect-square w-48 h-48" // Definindo tamanho explícito e aspect ratio
                />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">{t('about.claraName')}</h3>
                <p className="text-gray-500 mb-4"></p> {/* Informação da data de nascimento */}
                <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:clara@arafeira.com" className="text-sm">
                    clara.passarinho@gmail.com
                  </a>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('about.claraBioP1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('about.claraBioP2')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('about.claraBioP3')}
                </p>
              </div>
            </div>

            {/* Andreia Galvão */}
            <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
              <div className="flex flex-col items-center text-center mb-8">
                {/* Caminho da imagem para Andreia Galvão */}
                <img
                  src="images/Andreia.jpg" // SUGESTÃO: Coloque a imagem da Andreia aqui (ex: public/images/andreia_galvao.jpg)
                  alt="Andreia Galvão"
                  width={200}
                  height={200}
                  className="rounded-full mb-6 object-cover aspect-square w-48 h-48" // Definindo tamanho explícito e aspect ratio
                />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">{t('about.andreiaName')}</h3>
                <p className="text-gray-500 mb-4"></p> {/* Informação da data de nascimento */}
                <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:andreia@arafeira.com" className="text-sm">
                    andreiabaptistagalvao@gmail.com
                  </a>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('about.andreiaBioP1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('about.andreiaBioP2')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('about.andreiaBioP3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-4">A Rafeira</h3>
          <p className="text-gray-600">Estrutura de Criação Artística</p>
        </div>
      </footer>
    </div>
  );
}
