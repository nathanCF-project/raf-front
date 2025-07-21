// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";
//import "./CulturalExchangesPage.css"; 

export default function CulturalExchangesPage() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Intercâmbios Culturais</h1>

      {/* Intercâmbio 1 */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <img
            src="/images/intercambio-exemplo.jpg" 
            alt="Intercâmbio cultural exemplo"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>Conexões além-fronteiras</h2>
          <p>
            A Rafeira acredita que a cultura não tem fronteiras. Com os nossos programas de intercâmbio,
            promovemos o encontro de artistas e criadores de diferentes partes do mundo,
            para partilha de saberes, experiências e práticas.
          </p>
          <p>
            Estes intercâmbios podem assumir a forma de residências artísticas, oficinas internacionais ou apresentações conjuntas.
          </p>
        </div>
      </div>

      <div className="row mb-5 align-items-center">
        <div className="col-md-6 order-md-2">
          <img
            src="/images/outro-exemplo.jpg"
            alt="Outro projeto de intercâmbio"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>Nome do Projeto de Intercâmbio</h2>
          <p>
            Breve descrição futura aqui. Pode incluir locais envolvidos, datas e parceiros internacionais.
          </p>
        </div>
      </div>
      

      <div className="text-center">
        <p className="text-muted fst-italic">Mais detalhes sobre os nossos intercâmbios em breve.</p>
      </div>
    </div>
  );
}