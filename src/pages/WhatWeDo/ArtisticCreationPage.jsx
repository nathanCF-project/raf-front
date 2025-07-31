// my-react-app/src/pages/ArtisticCreation.jsx

import React from "react";
import { Link } from "react-router-dom"; // Certifique-se de que react-router-dom está instalado

import NewsletterSubscribe from '../../components/Forms/NewsletterSubscribe';

// Array de projetos artísticos
const projects = [
  {
    id: "hotel-chronos", // ID único para o projeto
    title: "Hotel Chronos",
    year: "2024", // Ou o ano de estreia se for diferente
    type: "Teatro",
    image: "images/Hotel-Chronos2.jpg", // Caminho para a imagem de capa do Hotel Chronos
    description:
      "A primeira criação da estrutura, um espetáculo sobre a urgência climática que cruza teatro, dramaturgia e tecnologia.",
  },
  {
    id: "projeto-instalacao-x", // Exemplo de um novo projeto
    title: "Em-Breve",
    year: "2025",
    type: "Instalação",
    image: "images/fixing.png", // Caminho para a imagem de capa
    description:
      "Esta pagina esta em desenvolvimento, e está quase..",
  },
  
  {
    id: "peça-dramaturgica-y", // Exemplo de um novo projeto
    title: "Em-Breve",
    year: "2025",
    type: "Dramaturgia",
    image: "images/fixing.png", // Caminho para a imagem de capa
    description:
      "Esta pagina esta em desenvolvimento, e está quase..",
  }
  // Adicione mais projetos aqui conforme necessário, seguindo o mesmo formato
  // e criando IDs únicos para cada um. 
];  

const ArtisticCreation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Criação Artística</h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A Rafeira desenvolve projetos nas áreas do teatro, da dramaturgia e também da instalação com recurso a tecnologia,
            procurando cruzar linguagens e refletir criticamente sobre o presente.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            // O Link aqui já faz exatamente o que o seu Dev0 sugeriu:
            // ao clicar, navega para a página detalhada do projeto.
            <Link
              key={project.id}
              to={`/artistic-creation/${project.id}`} 
              className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden" // Adicionado overflow-hidden
            >
              <div className="relative overflow-hidden"> {/* Adicionado um div para o hover da imagem */}
                <img
                  src={project.image || "/placeholder.svg"} // Usa a imagem do projeto ou um placeholder
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {/* Overlay para mostrar nome e ano ao passar o cursor */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-lg">{project.year}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{project.type}</span>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisticCreation;