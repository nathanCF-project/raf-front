// src/components/PublicEventList.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import API_BASE_URL from '../../api/config';

const ITEMS_PER_PAGE = 10; // Define quantos itens serão exibidos por página

function PublicEventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEventsCount, setTotalEventsCount] = useState(0);

    // --- ESTADOS PARA FILTROS E BUSCA ---
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState(''); // Changed from filterEventType to filterCategory
    const [filterLocation, setFilterLocation] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState(''); // For filtering by an end date range

    // Ref para o timer do debounce
    const debounceTimeoutRef = useRef(null);

    // Dados para os dropdowns de filtro (do seu EventForm)
    const eventCategories = [
        'Espetáculo',
        'Oficina',
        'Debate',
        'Residência',
        'Outro'
    ];

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            const fetchPublicEvents = async () => {
                setLoading(true);
                setError(null);

                // --- CONSTRUIR URL COM PARÂMETROS DE FILTRO ---
                const queryParams = new URLSearchParams();
                queryParams.append('page', currentPage.toString());
                queryParams.append('limit', ITEMS_PER_PAGE.toString());

                if (searchQuery) {
                    queryParams.append('search', searchQuery);
                }
                if (filterCategory) {
                    queryParams.append('category', filterCategory);
                }
                if (filterLocation) {
                    queryParams.append('location', filterLocation);
                }
                if (filterStartDate) {
                    queryParams.append('startDate', filterStartDate);
                }
                if (filterEndDate) {
                    queryParams.append('endDate', filterEndDate);
                }

                //REQUISICAO PARA TESTE LOCAL ABAIXO (import.metaVITEAPI)
                //const url = `${import.meta.env.VITE_API_URL}/api/events?${queryParams.toString()}`; // Endpoint público para eventos
                const url = `${API_BASE_URL}/events?${queryParams.toString()}`; // Endpoint público para eventos
                // --- FIM DA CONSTRUÇÃO DA URL ---

                try {
                    const response = await axios.get(url); // No token needed for public route
                   console.log('Resposta da API:', response.data);

                    setEvents(response.data.events);
                    setTotalPages(response.data.totalPages);
                    setTotalEventsCount(response.data.totalEvents);
                } catch (err) {
                    console.error('Erro ao buscar eventos públicos:', err);
                    setError(err.response?.data?.error || 'Não foi possível carregar os eventos.');
                } finally {
                    setLoading(false);
                }
            };

            fetchPublicEvents();
        }, 500); // Atraso de 500ms (meio segundo) antes de disparar a busca

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [currentPage, searchQuery, filterCategory, filterLocation, filterStartDate, filterEndDate]);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    // Estilos auxiliares (mantidos para consistência visual)
    const filterSectionStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '20px',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '15px',
        border: '1px solid #eee',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    };

    const filterGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '150px',
    };

    const filterLabelStyle = {
        marginBottom: '5px',
        fontWeight: 'bold',
        fontSize: '0.9em',
        color: '#555',
    };

    const filterInputStyle = {
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '0.9em',
        width: '100%',
        boxSizing: 'border-box',
    };

    if (loading) return <p style={{ textAlign: 'center', margin: '20px' }}>Carregando eventos...</p>;
    if (error) return <p style={{ textAlign: 'center', margin: '20px', color: 'red' }}>{error}</p>;

    if (totalEventsCount === 0 && (searchQuery || filterCategory || filterLocation || filterStartDate || filterEndDate)) {
        return <p style={{ textAlign: 'center', margin: '20px' }}>Nenhum evento encontrado com os filtros aplicados.</p>;
    }
    if (totalEventsCount === 0) {
        return <p style={{ textAlign: 'center', margin: '20px' }}>Nenhum evento público disponível no momento.</p>;
    }

    return (
        <div style={{
            padding: '20px',
            maxWidth: '100%',
            margin: '20px auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            overflowX: 'auto'
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Calendário/Lista de Atividades Públicas Futuras ({totalEventsCount} Eventos no Total)</h3>

            {/* --- SEÇÃO DE FILTROS E BUSCA --- */}
            <div style={filterSectionStyle}>
                <div style={filterGroupStyle}>
                    <label htmlFor="search" style={filterLabelStyle}>Buscar por Título/Descrição:</label>
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => { setCurrentPage(1); setSearchQuery(e.target.value); }}
                        placeholder="Título ou Descrição"
                        style={filterInputStyle}
                    />
                </div>

                <div style={filterGroupStyle}>
                    <label htmlFor="filterCategory" style={filterLabelStyle}>Tipo de Evento:</label>
                    <select
                        id="filterCategory"
                        value={filterCategory}
                        onChange={(e) => { setCurrentPage(1); setFilterCategory(e.target.value); }}
                        style={filterInputStyle}
                    >
                        <option value="">Todas</option>
                        {eventCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div style={filterGroupStyle}>
                    <label htmlFor="filterLocation" style={filterLabelStyle}>Local:</label>
                    <input
                        type="text"
                        id="filterLocation"
                        value={filterLocation}
                        onChange={(e) => { setCurrentPage(1); setFilterLocation(e.target.value); }}
                        placeholder="Cidade, País, etc."
                        style={filterInputStyle}
                    />
                </div>

                <div style={filterGroupStyle}>
                    <label htmlFor="filterStartDate" style={filterLabelStyle}>Data Início:</label>
                    <input
                        type="date"
                        id="filterStartDate"
                        value={filterStartDate}
                        onChange={(e) => { setCurrentPage(1); setFilterStartDate(e.target.value); }}
                        style={filterInputStyle}
                    />
                </div>

                <div style={filterGroupStyle}>
                    <label htmlFor="filterEndDate" style={filterLabelStyle}>Data Fim:</label>
                    <input
                        type="date"
                        id="filterEndDate"
                        value={filterEndDate}
                        onChange={(e) => { setCurrentPage(1); setFilterEndDate(e.target.value); }}
                        style={filterInputStyle}
                    />
                </div>

                {(searchQuery || filterCategory || filterLocation || filterStartDate || filterEndDate) && (
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setFilterCategory('');
                            setFilterLocation('');
                            setFilterStartDate('');
                            setFilterEndDate('');
                            setCurrentPage(1);
                        }}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9em',
                            marginTop: '10px'
                        }}
                    >
                        Limpar Filtros
                    </button>
                )}
            </div>
            {/* --- FIM DA SEÇÃO DE FILTROS E BUSCA --- */}

            {/* Event Cards/List (You might want to style this differently, e.g., using a grid for cards) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {events.map(event => (
                    <div key={event.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {event.image_url && (
                            <img src={event.image_url} alt={event.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
                        )}
                        <h4 style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>{event.title}</h4>
                        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>
                            <strong>Tipo:</strong> {event.category}
                        </p>
                        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>
                            <strong>Local:</strong> {event.location}
                        </p>
                        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>
                            <strong>Data:</strong> {new Date(event.event_date).toLocaleDateString()}
                            {event.event_time && ` às ${event.event_time}`}
                            {/* If you have end_date, add it here */}
                        </p>
                        <p style={{ fontSize: '0.9em', marginBottom: '10px', flexGrow: 1 }}>
                            {event.description?.substring(0, 150)}{event.description?.length > 150 ? '...' : ''}
                        </p>
                        <div style={{ marginTop: '10px' }}>
                            {event.external_link && (
                                <a
                                    href={event.external_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.9em',
                                        marginRight: '10px'
                                    }}
                                >
                                    Mais Informações
                                </a>
                            )}
                            {/* Add other links like tickets if separate fields exist */}
                        </div>
                    </div>
                ))}
            </div>


            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ padding: '8px 15px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ padding: '8px 15px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Próxima
                </button>
            </div>
        </div>
    );
}


export default PublicEventList;
