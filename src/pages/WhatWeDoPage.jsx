import React from 'react';
import { Link } from 'react-router-dom';

const WhatWeDoPage = () => {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-8 text-gray-900">O que fazemos?</h1>
      <p className="text-lg text-gray-700 mb-10">
        Explore os quatro eixos de ação da A Rafeira:
      </p>
      <ul className="space-y-4 text-lg">
        <li>
          <Link to="/criacao-artistica" className="text-red-600 hover:underline">
            Criação Artística
          </Link>
        </li>
        <li>
          <Link to="/formacao" className="text-red-600 hover:underline">
            Formação
          </Link>
        </li>
        <li>
          <Link to="/intercambios-culturais" className="text-red-600 hover:underline">
            Intercâmbios Culturais
          </Link>
        </li>
        <li>
          <Link to="/defesa-da-cultura" className="text-red-600 hover:underline">
            Defesa da Cultura
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default WhatWeDoPage;
