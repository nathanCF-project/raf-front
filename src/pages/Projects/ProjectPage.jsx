// my-react-app/src/pages/ProjectPage.jsx

// "use client" - Remova esta linha, é específica para Next.js App Router.
import React from 'react'; // Boa prática
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

// 1. Mapeamento Estático dos IDs da URL para as CHAVES do JSON
// E INCLUSÃO DOS METADADOS ESTÁTICOS (URLs de Imagem/Vídeo)
const projectMapping = {
  "hotel-chronos": {
    key: "hotelChronos", 
    metadata: {
      image: "/images/hotel-chronos5.jpg", // Certifique-se que o caminho está correto
      gallery: ["/images/hotel-chronos1.jpg", "/images/Hotel-Chronos2.jpg", "/images/Hotel-Chronos3.jpg"],
      videos: [/* Inclua aqui o URL de embed do YouTube, ex: "https://www.youtube.com/embed/VIDEOLOOP_ID" */],
    }
  },
  "projeto-instalacao-x": {
    key: "arrendar", // Chave corrigida no JSON
    metadata: {
      image: "/images/instalacao_x_banner.jpg",
      gallery: ["/images/instalacao_x_foto1.jpg", "/images/instalacao_x_foto2.jpg", "/images/instalacao_x_foto3.jpg"],
      videos: ["https://www.youtube.com/watch?v=A9QQQ0CU3CE&list=PLpxMJPV9fEcIoX1Yu6-gWS4CmPmhMdFim&index=23"],
    }
  },
  "peça-dramaturgica-y": {
    key: "emConstrucao", // Chave corrigida no JSON
    metadata: {
      image: "/images/dramaturgia_y_banner.jpg",
      gallery: ["/images/dramaturgia_y_foto1.jpg", "/images/dramaturgia_y_foto2.jpg"],
      videos: [],
    }
  }
  // Adicione aqui outros projetos
};

const ProjectPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const projectMap = projectMapping[id];

  if (!projectMap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">{t('projectPage.notFoundTitle')}</h1>
          <Link to="/what-we-do/artistic-creation" className="text-blue-600 hover:text-blue-800 underline">
            {t('projectPage.backLink')}
          </Link>
        </div>
      </div>
    );
  }

  // Busca os textos do JSON usando a chave correta
  const projectTexts = t(`artisticCreation.projects.${projectMap.key}`, { returnObjects: true }); 
  
  // Combina os metadados (Imagens/Vídeos) com os textos traduzidos
  const project = {
    ...projectMap.metadata, // URLs de Imagem/Vídeo
    ...projectTexts         // Textos traduzidos, Team, Events
  };

  // Se o i18n retornar a chave (string) em vez do objeto, significa que não encontrou a tradução
  if (!project.title || typeof project.title !== 'string' || project.title === projectMap.key) {
     // Isso pega o caso onde a chave JSON está errada ou o JSON está faltando
     return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">{t('projectPage.notFoundTitle')}</h1>
            <Link to="/what-we-do/artistic-creation" className="text-blue-600 hover:text-blue-800 underline">
              {t('projectPage.backLink')}
            </Link>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/what-we-do/artistic-creation" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('projectPage.backLink')} {/* TRADUÇÃO 3 */}
          </Link>
        </div>

        {/* Project Header (Todos os dados são traduzidos, exceto o ano que é fixo) */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500 uppercase tracking-wide">{project.type}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{project.year}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">{project.title}</h1>

          <div className="w-24 h-px bg-gray-300 mb-8"></div>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{project.description}</p>
        </div>

         {/* Hero Image / Video */}
        {project.image && (
          <div className="mb-12">
            <img
              // AGORA USAMOS project.image (que vem do projectMapping.metadata)
              src={project.image}
              alt={project.title}
              className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-sm"
            />
          </div>
        )}
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">{t('projectPage.aboutTitle')}</h2>
              <p className="text-gray-700 leading-relaxed">{project.detailedDescription}</p>
            </div>

            {/* Photo Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">{t('projectPage.galleryTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <img
                      key={index}
                      // AGORA USAMOS 'image' diretamente do array
                      src={image}
                      alt={t('projectPage.placeholderImageAlt', { projectTitle: project.title, index: index + 1 })}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

             {/* Video Section */}
            {project.videos && project.videos.length > 0 && (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">{t('projectPage.videosTitle')}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.videos.map((videoUrl, index) => (
                    <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                      <iframe
                        // AGORA USAMOS 'videoUrl' diretamente do array
                        src={videoUrl}
                        title={`Video ${index + 1} de ${project.title}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Ficha Artística (Artistic Team) */}
            {project.team && project.team.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('projectPage.teamTitle')}</h3> {/* TRADUÇÃO 7 */}
                <div className="space-y-3">
                  {project.team.map((member, index) => (
                    <div key={index}>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      {/* Tradução da função/cargo (Role) */}
                      <div className="text-sm text-gray-500">{t(`projectPage.roles.${member.roleKey}`)}</div> 
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Datas dos Espetáculos (Event Dates) */}
            {project.events && project.events.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('projectPage.eventsTitle')}</h3> {/* TRADUÇÃO 8 */}
                <div className="space-y-4">
                  {project.events.map((event, index) => (
                    <div key={index}>
                      <div className="text-sm font-medium text-gray-900">{event.date}</div>
                      <div className="text-sm text-gray-500">{event.venue}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProjectPage;