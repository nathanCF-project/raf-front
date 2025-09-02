// src/pages/WhatWeDo/HowWeThinkPage.jsx

import React from "react";
// Importar o componente NewsletterSubscribe, assumindo que ele já está ou será refatorado para Tailwind/Shadcn
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe'; // Ajuste o caminho se necessário
import { useTranslation } from 'react-i18next';


export default function HowWeThinkPage() { 

    const { t, i18n } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {t('think.thinktitle')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('think.thinksubtitle')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto"> {/* Centraliza o conteúdo e limita a largura */}
        {/* Bloco de citação 1 */}
        <blockquote className="border-l-4 border-gray-900 bg-gray-50 p-4 pl-6 mb-6 rounded-md shadow-sm italic text-gray-700">
          <p className="mb-0">
            {t('think.thinkmsg1')}
          </p>
        </blockquote>

        {/* Bloco de citação 2 */}
        <blockquote className="border-l-4 border-amber-500 bg-amber-50 p-4 pl-6 mb-6 rounded-md shadow-sm italic text-amber-800">
          <p className="mb-0">
            {t('think.thinkmsg2')}
          </p>
        </blockquote>

        {/* Bloco de citação 3 */}
        <blockquote className="border-l-4 border-blue-600 bg-blue-50 p-4 pl-6 mb-6 rounded-md shadow-sm italic text-blue-800">
          <p className="mb-0">
            {t('think.thinkmsg3')}
          </p>
        </blockquote>

        <div className="mt-10 text-center text-gray-600">
          <p className="italic text-xl mb-2"> {/* Aumenta o tamanho da fonte para a citação final */}
            {t('think.thinkmsg4')}
          </p>
          <p className="font-semibold text-lg"> {/* Aumenta o tamanho da fonte para o autor */}
            — A Rafeira
          </p>
        </div>
      </div>


<br /><br />
      {/* Seção para o formulário de NewsletterSubscribe */}
      <div className="mt-20 mb-8 bg-gray-50 p-6 rounded-lg shadow-inner max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {t('think.thinknewsletter')}
        </h2>
        <NewsletterSubscribe />
      </div>
    </div>
  );
}