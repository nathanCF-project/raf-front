// my-react-app/src/pages/ArtisticCreation.jsx

import React from "react";
import { Link } from "react-router-dom"; // Certifique-se de que react-router-dom está instalado

import NewsletterSubscribe from '../../components/Forms/NewsletterSubscribe';

import { useTranslation } from "react-i18next";

// Array de projetos artísticos
const projects = [
   {
    id: "hotel-chronos",
    key: "hotelChronos", // <--- Chave no JSON
    year: "2024",
    image: "images/cronosinsta2.jpg",
  },
  {
    id: "projeto-instalacao-x",
    key: "arrendar", // <--- Chave no JSON
    year: "2025",
    image: "images/fixing.png",
  },
  
  {
    id: "peca-dramaturgica-y",
    key: "emConstrucao", // <--- Chave no JSON
    year: "2025",
    image: "images/fixing.png",
  }
];    

const ArtisticCreation = () => {

    const { t } = useTranslation();

  return (
     <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header (Mantido com a tradução funcionando) */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">{t("artisticCreation.headerTitle")}</h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("artisticCreation.headerSubtitle")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/artistic-creation/${project.id}`} 
              className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  // Usamos a chave para buscar o título traduzido no alt
                  alt={t(`artisticCreation.projects.${project.key}.title`)} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {/* Overlay para mostrar nome e ano ao passar o cursor */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-white text-center">
                    {/* BUSCANDO O TÍTULO TRADUZIDO */}
                    <h3 className="text-2xl font-bold">{t(`artisticCreation.projects.${project.key}.title`)}</h3>
                    <p className="text-lg">{project.year}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  {/* BUSCANDO O TIPO TRADUZIDO */}
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{t(`artisticCreation.projects.${project.key}.type`)}</span>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {/* BUSCANDO O TÍTULO TRADUZIDO novamente */}
                  {t(`artisticCreation.projects.${project.key}.title`)}
                </h3>

                {/* BUSCANDO A DESCRIÇÃO TRADUZIDA */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{t(`artisticCreation.projects.${project.key}.description`)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Seção de Assinatura de Newsletter (se houver) */}
        {/* <NewsletterSubscribe /> */}

      </div>
    </div>
  );
};

export default ArtisticCreation;