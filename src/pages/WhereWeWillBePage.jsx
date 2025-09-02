// src/pages/WhatWeDo/WhereWeWillBePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// import EventFilter from "../components/EventFilter"; // Ative quando criar o componente de filtro
import PublicEventList from "../components/Forms/PublicEventList";
import API_BASE_URL from "../api/config";
import { useTranslation } from 'react-i18next';


export default function WhereWeWillBePage() {

  const { t, i18n } = useTranslation();
  //const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Adicionando um pequeno delay para simular carregamento, se desejar testar o estado de loading.
  useEffect(() => {
    // Apenas para simular o carregamento inicial da página antes de renderizar o PublicEventList
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Meio segundo de "carregamento"

    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gray-50">
        <p className="text-lg text-gray-600">{t('where.whereloading')}</p>
      </div>
    );
  }

  // O `error` aqui seria para erros na própria `WhereWeWillBePage`,
  // não para erros da lista de eventos (que `PublicEventList` deve tratar).
  // Por isso, simplifiquei o `error` para um caso mais genérico se algo *realmente* der errado nesta página.
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-red-50 p-4 rounded-md">
        <p className="text-red-700 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{t('where.wheretitle')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('where.wheresubtitle')}
        </p>
      </div>

      {/* PublicEventList vai buscar, filtrar e exibir tudo */}
      {/* O alert-secondary do Bootstrap foi removido e substituído por uma estilização simples de container */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <PublicEventList />
      </div>

    </div>
  );
}


/*   VERSAO 1 (com o componente de filtragem separado)
// src/pages/WhatWeDo/WhereWeWillBePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// import EventFilter from "../components/EventFilter"; // Ative quando criar o componente de filtro
import PublicEventList from "../components/Forms/PublicEventList";

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

      <div className="alert alert-secondary text-center" role="alert">
        <PublicEventList/>
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

*/