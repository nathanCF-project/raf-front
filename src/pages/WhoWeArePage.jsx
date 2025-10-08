//src/pages/WhoWeArePage.jsx 

import React from 'react'; // Importar React é uma boa prática
import { Mail } from "lucide-react"; // Para o ícone de e-mail

import { useTranslation } from 'react-i18next';

// componente Image seja do 'react' para aplicações SPA (Single Page Application)

export default function AboutUs() {

  const { t, i18n } = useTranslation();


  return (
     <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-red-50 via-white to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6">
            {t("about.heroTitle")}
          </h1>
          <div className="w-24 h-[2px] bg-red-200 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            {t("about.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section
        className="relative py-32 md:py-40 px-4 md:px-6 bg-center bg-cover bg-fixed overflow-hidden"
        style={{
          backgroundImage: "url('/images/Hotel-Chronos3.jpg')",
        }}
      >
        {/* Overlay artístico */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-red-50/70 to-red-100/70 backdrop-blur-sm"></div>

        {/* Conteúdo */}
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12">
            {t("about.historyTitle")}
          </h2>

          <div className="prose prose-lg prose-gray mx-auto text-gray-700">
            <p className="text-lg leading-relaxed mb-6">
              {t("about.historyP1")}
            </p>
            <p className="text-lg leading-relaxed mb-6">
              {t("about.historyP2")}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white via-red-50/30 to-red-100/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-20 text-center">
            {t("about.pillarsTitle")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
            {[
              { title: "pillar1Title", desc: "pillar1Desc", icon: "💡" },
              { title: "pillar2Title", desc: "pillar2Desc", icon: "🎓" },
              { title: "pillar3Title", desc: "pillar3Desc", icon: "🌍" },
              { title: "pillar4Title", desc: "pillar4Desc", icon: "🎭" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {t(`about.${item.title}`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`about.${item.desc}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-founders Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-20 text-center">
            {t("about.cofoundersTitle")}
          </h2>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Clara */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-md hover:shadow-xl transition-all">
              <div className="flex flex-col items-center text-center mb-8">
                <img
                  src="/images/clara.jpg"
                  alt="Clara Passarinho"
                  className="rounded-full mb-6 object-cover w-48 h-48 shadow-lg"
                />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  {t("about.claraName")}
                </h3>
                <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:clara.passarinho@gmail.com" className="text-sm">
                    clara.passarinho@gmail.com
                  </a>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>{t("about.claraBioP1")}</p>
                <p>{t("about.claraBioP2")}</p>
                <p>{t("about.claraBioP3")}</p>
              </div>
            </div>

            {/* Andreia */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-md hover:shadow-xl transition-all">
              <div className="flex flex-col items-center text-center mb-8">
                <img
                  src="/images/Andreia.jpg"
                  alt="Andreia Galvão"
                  className="rounded-full mb-6 object-cover w-48 h-48 shadow-lg"
                />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  {t("about.andreiaName")}
                </h3>
                <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:andreiabaptistagalvao@gmail.com" className="text-sm">
                    andreiabaptistagalvao@gmail.com
                  </a>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>{t("about.andreiaBioP1")}</p>
                <p>{t("about.andreiaBioP2")}</p>
                <p>{t("about.andreiaBioP3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-6 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-2">A Rafeira</h3>
          <p className="text-gray-600 text-sm">Estrutura de Criação Artística</p>
        </div>
      </footer>
    </div>
  );
}
