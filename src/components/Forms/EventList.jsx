// src/components/Admin/EventList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom'; // Se quiser um botão para criar novo
import PublicEventList from './PublicEventList';
// Importações para Tabela Shadcn se você as tiver:
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import API_BASE_URL from '../../api/config';

function EventList({ refreshTrigger, onEditEvent }) {
    const { token } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchEvents = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
             //para testes LOCAIS
            //const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/admin`, {
            const response = await axios.get(`${API_BASE_URL}/events/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(response.data);
        } catch (err) {
            console.error('Erro ao buscar eventos (admin):', err);
            setError(err.response?.data?.error || 'Erro ao carregar eventos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchEvents();
        }
    }, [token, refreshTrigger]); // Recarrega quando o token ou o trigger mudam

    const handleDeleteEvent = async (id, title) => {
        if (window.confirm(`Tem certeza que deseja DELETAR o evento "${title}"? Esta ação é irreversível.`)) {
            setMessage('');
            setError('');
            try {

                //paraTESTE LOCAL 
                //const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/admin/${id}`, {

                const response = await axios.delete(`${API_BASE_URL}/events/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchEvents(); // Recarrega a lista
            } catch (err) {
                console.error('Erro ao deletar evento:', err);
                setError(err.response?.data?.error || 'Erro ao deletar evento.');
            }
        }
    };

    const handlePublishToggle = async (event) => {
        setMessage('');
        setError('');
        const newPublishStatus = event.is_published ? 0 : 1; // Inverte o status

        try {

                //paraTESTE LOCAL 
            //const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/events/admin/${event.id}`,
            const response = await axios.put(`${API_BASE_URL}/events/admin/${event.id}`,
                { ...event, is_published: newPublishStatus }, // Envia o objeto completo com o novo status
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage(`Status do evento "${event.title}" alterado para ${newPublishStatus ? 'Publicado' : 'Rascunho'}.`);
            fetchEvents(); // Recarrega a lista para mostrar o novo status
        } catch (err) {
            console.error('Erro ao alterar status de publicação:', err);
            setError(err.response?.data?.error || 'Erro ao alterar status de publicação.');
        }
    };

    if (loading) {
        return <p>Carregando eventos...</p>;
    }

    return (
        <div className="admin-list-container">
            {message && <div className="text-green-600 mb-4">{message}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

            {events.length === 0 ? (
                <p>Nenhum evento criado ainda. <Button onClick={() => onEditEvent(null)} className="ml-2">Criar um agora!</Button></p>
            ) : (
                <div className="overflow-x-auto"> {/* Para tabelas em telas pequenas */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publicado</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(event.event_date).toLocaleString()}
                                        {event.event_time && ` (${event.event_time})`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {event.is_published ? 'Sim' : 'Não'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Button variant="outline" size="sm" onClick={() => onEditEvent(event)} className="mr-2">Editar</Button>
                                        <Button variant="outline" size="sm" onClick={() => handlePublishToggle(event)} className={`mr-2 ${event.is_published ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                                            {event.is_published ? 'Despublicar' : 'Publicar'}
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id, event.title)}>Deletar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EventList;