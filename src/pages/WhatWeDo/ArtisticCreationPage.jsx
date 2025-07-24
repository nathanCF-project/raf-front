// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from 'react';
import NewsletterSubscribe from '../../components/Forms/NewsletterSubscribe';


const ArtisticCreationPage = () => {
  return (
    <div className="container py-5">
      {/* Título da página */}
      <div className="text-center mb-5">
        <h1 className="display-4">Criação Artística</h1>
        <p className="lead">
          A Rafeira desenvolve projetos nas áreas do teatro, da dramaturgia e da instalação com recurso a tecnologia, cruzando linguagens e refletindo criticamente sobre o presente.
        </p>
      </div>

      {/* Projeto: Hotel Chronos */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="/src/assets/Hotel-Chronos3.jpg" 
            alt="Hotel Chronos"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3>Hotel Chronos</h3>
          <p>
            Primeiro espetáculo da estrutura, “Hotel Chronos” aborda a urgência climática através de uma narrativa envolvente e visualmente inovadora. Combina dramaturgia original com instalação tecnológica para provocar reflexão sobre o presente.
          </p>
          <ul>
            <strong>Direção:</strong> Clara Passarinho & Andreia Galvão
            <br /><strong>Residência:</strong> Largo Residências, Lisboa
            <br />
            <strong>Ano:</strong> 2024
          </ul>
        </div>
      </div>

    
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-md-2">
          <img
            src="/src/assets/Hotel-Chronos2.jpg"
            alt="Projeto 2"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3>Título do Projeto</h3>
          <p>Descrição ...</p>
        </div>
      </div>
    <br />

      <div className="bg-light p-4 mt-5 rounded">
        
        <NewsletterSubscribe/>
      </div>
    </div>
  );
};

export default ArtisticCreationPage;





