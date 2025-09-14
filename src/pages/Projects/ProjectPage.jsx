// my-react-app/src/pages/ProjectPage.jsx

// "use client" - Remova esta linha, é específica para Next.js App Router.
import React from 'react'; // Boa prática
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

// O objeto projectsData deve conter os detalhes completos de CADA projeto
// listado em ArtisticCreation.jsx, usando o mesmo 'id'.
const projectsData = {
  "hotel-chronos": {
    title: "Hotel Chronos",
    year: "2024", // Ano do espetáculo
    type: "Teatro",
    image: "images/hotel-chronos5.jpg", // Imagem de banner para a página de detalhe
    description: "Um espetáculo sobre a urgência climática, a primeira criação da estrutura A Rafeira.",
    detailedDescription:
      "Hotel Chronos é um espetáculo que mergulha na ansiedade provocada pela crise e pela iminente catástrofe climática. Num hotel no fim do mundo, duas mulheres cuidam religiosamente da sua gestão, como se essa prática pudesse atrair clientela. Mas há anos que ninguém chega. Uma delas começa a questionar a rotina absurda, enquanto a outra insiste em mantê-la, aterrorizada pelo vazio que a mudança pode trazer. O tempo passa e, no fundo do hotel, o relojoeiro tenta consertar o relógio…",
    team: [
      { role: "Interpretação e co-criação", name: "Clara Passarinho, Andreia Galvão e Carla Madeira" },
      { role: "Dramaturgia", name: "Andreia Galvão e Bárbara Soares" },
      { role: "Sonoplastia", name: "Clara Passarinho" },
      { role: "Operação de som e vídeo", name: "Vicente Silvestre" },
      { role: "Fotografia", name: "Daniel Silva" },
      // Adicione outros membros da ficha artística
    ],
    events: [
      { date: "Maio de 2025", venue: "Hostel Saint Jordi" },
      // Adicione outras datas e locais de espetáculos
    ],
    gallery: [
      "images/hotel-chronos1.jpg", // Fotos da galeria do Hotel Chronos
      "images/Hotel-Chronos2.jpg",
      "images/Hotel-Chronos3.jpg",
      // Adicione mais fotos da galeria
    ],
   /* videos: [
      "https://www.youtube.com/embed/YOUR_VIDEO_ID_1", // Substitua YOUR_VIDEO_ID_1 pelo ID do seu vídeo do YouTube
      // "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
    ] */
  },
  "projeto-instalacao-x": {
    title: "Em-Construção..",
    year: "2025",
    type: "Instalação",
    image: "/images/instalacao_x_banner.jpg",
    description: "nós estamos neste momento a escrever e a trabalhar nesse texto",
    detailedDescription:
      "projeto dramatúrgico ",
    team: [
      { role: "Direção Artística", name: "Equipa A Rafeira" },
      { role: "Design de Instalação", name: "Nome do Designer" },
      { role: "Engenharia de Som", name: "Nome do Engenheiro" },
    ],
    events: [
      { date: "Abril - Junho de 2025", venue: "Jardins do Palácio de Cristal, Porto" },
      { date: "Julho - Setembro de 2025", venue: "Parque da Cidade, Lisboa" },
    ],
    gallery: [
      "/images/instalacao_x_foto1.jpg",
      "/images/instalacao_x_foto2.jpg",
      "/images/instalacao_x_foto3.jpg",
    ],
    videos: [] // Se não houver vídeos para este, deixe vazio
  },
  "peça-dramaturgica-y": {
    title: "Em Desenvolvimento",
    year: "2025",
    type: "Dramaturgia",
    image: "/images/dramaturgia_y_banner.jpg",
    description: "Um texto que aborda as narrativas a ser escrito..",
    detailedDescription:
      "Em contrução..",
    team: [
      { role: "Dramaturgia e Pesquisa", name: "Equipa A Rafeira" },
      { role: "Consultoria Cultural", name: "Nome do Consultor" },
    ],
    events: [
      { date: "Setembro de 2020", venue: "Leitura Encenada" },
      { date: "Dezembro de 2020", venue: "Publicação Digital (previsão)" },
    ],
    gallery: [
      "/images/dramaturgia_y_foto1.jpg",
      "/images/dramaturgia_y_foto2.jpg",
      // Adicione mais fotos da galeria
    ],
    videos: [] // Se não houver vídeos para este, deixe vazio
  },
  // Adicione os detalhes completos de outros projetos aqui, com o ID correspondente ao que está em `projects`
};

const ProjectPage = () => {
  const { id } = useParams();
  const project = projectsData[id];

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Projeto Não Encontrado</h1>
          <Link to="/artistic-creation" className="text-blue-600 hover:text-blue-800 underline">
            Voltar para Criação Artística
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
            Voltar para Criação Artística
          </Link>
        </div>

        {/* Project Header */}
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
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Sobre o Projeto</h2>
              <p className="text-gray-700 leading-relaxed">{project.detailedDescription}</p>
            </div>

            {/* Photo Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Galeria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Aumentei para 3 colunas em lg */}
                  {project.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Galeria de imagens ${project.title} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Video Section */}
            {project.videos && project.videos.length > 0 && (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Vídeos</h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.videos.map((videoUrl, index) => (
                    <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                      {/* Embed YouTube video. Certifique-se que o URL é no formato de embed */}
                      <iframe
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ficha Artística</h3>
                <div className="space-y-3">
                  {project.team.map((member, index) => (
                    <div key={index}>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Datas dos Espetáculos (Event Dates) */}
            {project.events && project.events.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Datas dos Espetáculos</h3>
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