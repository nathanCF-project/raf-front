// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";
// import EventFilter from "../components/EventFilter"; // Ative quando criar o componente

export default function WhereWeWillBePage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Onde Vamos Estar?</h1>
        <p className="lead text-muted">Fique por dentro dos nossos próximos eventos, apresentações e oficinas.</p>
      </div>

      {/* Componente de Filtro de Eventos futuro*/}
      {/* <EventFilter /> */}
      <div className="alert alert-secondary text-center" role="alert">
        [Componente de filtro de eventos futuros será inserido aqui]
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4 mt-3">
        {/* Evento 1 */}
        <div className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Espetáculo "Nome do Evento"</h5>
              <p className="card-text">Local: Lisboa<br />Data: 15 de Setembro, 2025<br />Descrição rápida do evento ou apresentação.</p>
            </div>
          </div>
        </div>

        {/* Evento 2 */}
        <div className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Oficina "Nome da Oficina"</h5>
              <p className="card-text">Local: Porto<br />Data: 3 de Outubro, 2025<br />Workshop temático aberto ao público com inscrição gratuita.</p>
            </div>
          </div>
        </div>

        {/* Adicione mais cards conforme necessário */}
      </div>
    </div>
  );
}
