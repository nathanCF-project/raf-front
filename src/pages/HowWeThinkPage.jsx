// src/pages/WhatWeDo/HowWeThinkPage.jsx

import React from "react";
// Importar o componente NewsletterSubscribe, assumindo que ele já está ou será refatorado para Tailwind/Shadcn
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe'; // Ajuste o caminho se necessário
import { useTranslation } from 'react-i18next';


export default function HowWeThinkPage() { 

    const { t, i18n } = useTranslation();
  
  return (
      <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
          {t("think.title")}
        </h1>
        <div className="w-20 h-[2px] bg-red-300 mx-auto mb-8"></div>
        <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
          {t("think.subtitle")}
        </p>
      </section>

      {/* Main Text Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-24 text-gray-800">
        <div className="space-y-8 text-lg leading-relaxed">
          <p>{t("think.p1")}</p>
          <p>{t("think.p2")}</p>
          <p>{t("think.p3")}</p>
          <p>{t("think.p4")}</p>
          <p>{t("think.p5")}</p>
        </div>

        {/* Destaque Final */}
        <div className="mt-16 bg-red-100/60 border-l-4 border-red-500 p-6 rounded-md shadow-sm">
          <p className="italic text-lg text-gray-800 leading-relaxed">
            {t("think.highlight")}
          </p>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-red-50 to-white border-t border-red-100">
  <div className="max-w-2xl mx-auto text-center px-6">
    <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-10 border border-red-100">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
        {t("think.newsletter")}
      </h2>
      <p className="text-gray-600 mb-8">
        {t("think.newsletter2")}
      </p>
      <NewsletterSubscribe />
    </div>
  </div>
</section>
    </div>
  );
}