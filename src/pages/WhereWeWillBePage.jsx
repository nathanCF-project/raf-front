// src/pages/WhatWeDo/WhereWeWillBePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// import EventFilter from "../components/EventFilter"; // Ative quando criar o componente de filtro

export default function WhereWeWillBePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicEvents = async () => {
      setLoading(true);
      setError('');
      try {
        // Requisição para a rota pública
        const response = await axios.get('http://localhost:3001/api/events'); // Usar a URL completa aqui também
        setEvents(response.data);
      } catch (err) {
        console.error('Erro ao buscar eventos públicos:', err);
        setError('Não foi possível carregar os eventos. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicEvents();
  }, []); // Executa apenas uma vez ao montar o componente

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="text-lg text-gray-600">Carregando próximos eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Onde Vamos Estar?</h1>
        <p className="lead text-muted">Insights da nossa agenda com os nossos próximos eventos, apresentações e cursos</p>
      </div>

      {/* Componente de Filtro de Eventos futuro*/}
      {/* <EventFilter /> */}
      <div className="alert alert-secondary text-center" role="alert">
        [Componente de filtro de eventos futuros será inserido aqui]
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4 mt-3">
        {events.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-gray-600 text-xl">Nenhum evento futuro agendado no momento. Fique atento às nossas atualizações!</p>
          </div>
        ) : (
          events.map((event) => (
            <div className="col" key={event.id}>
              <div className="card h-100 shadow-sm">
                {event.image_url && (
                    <img src={event.image_url} alt={event.title} className="card-img-top object-cover h-48 w-full" />
                )}
                <div className="card-body">
                  <h5 className="card-title text-xl font-semibold">{event.title}</h5>
                  <p className="card-text text-gray-700 mb-2">
                    Local: {event.location || 'A definir'}
                    <br />
                    Data: {new Date(event.event_date).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {event.event_time && `, Hora: ${event.event_time}`}
                  </p>
                  <p className="card-text text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}