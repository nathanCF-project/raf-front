// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";
//import "./CultureDefensePage.css"; 
import NewsletterSubscribe from '../../components/Forms/NewsletterSubscribe';


export default function CultureDefensePage() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Defesa da Cultura</h1>

      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <img
            src="/images/cultura-defesa.jpg" // U placeholder
            alt="Defesa da cultura"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>Preservar, Valorizar, Resistir</h2>
          <p>
            A Rafeira acredita na cultura como um direito fundamental e uma ferramenta de transformação social.
            Atuamos na defesa ativa da diversidade cultural, das expressões populares e do acesso equitativo à produção e fruição artística.
          </p>
          <p>
            Em tempos de apagamento cultural e crises sociais, promover a cultura é também um ato de resistência.
          </p>
        </div>
      </div>

      {/* Bloco para projetos futuros - deixado comentado */}
      {/*
      <div className="row mb-5 align-items-center">
        <div className="col-md-6 order-md-2">
          <img
            src="/images/projeto-defesa.jpg"
            alt="Projeto de defesa da cultura"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>Nome do Projeto Cultural</h2>
          <p>
            Aqui poderá entrar um exemplo de projeto que visa defender a cultura — seja através de ações políticas,
            educação artística ou trabalho comunitário.
          </p>
        </div>
      </div>
      */}

      <div className="text-center">
        <p className="text-muted fst-italic">Mais informações sobre nossas ações em defesa da cultura estarão disponíveis em breve.</p>
      </div>
      <br /><br /><br /><br />
      <NewsletterSubscribe/>
    </div>
  );
}
