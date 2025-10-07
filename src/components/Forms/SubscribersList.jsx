// src/components/Admin/SubscriberList.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Loader2, Trash2 } from 'lucide-react'; // Ícones para delete e loading

 import API_BASE_URL from '../../api/config'; 

const SubscriberList = () => {
    const { token } = useAuth();
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Função para buscar a lista de assinantes
    const fetchSubscribers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            //TESTES LOCAIS 
            //const apiUrl = `${import.meta.env.VITE_API_URL}/api/newsletter/subscribers`; 

            const apiUrl = `${API_BASE_URL}/newsletter/subscribers`; 
            
            const res = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubscribers(res.data);
        } catch (err) {
            console.error('Erro ao buscar assinantes:', err);
            setError('Falha ao carregar a lista de assinantes.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);


    // Função para deletar um assinante
    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja DELETAR permanentemente este assinante?')) {
            return;
        }

        setDeletingId(id);
        setError(null);
        try {
            //TESTES LOCAIS
            //const apiUrl = `${import.meta.env.VITE_API_URL}/api/newsletter/subscribers/${id}`; 
            const apiUrl = `${API_BASE_URL}/newsletter/subscribers/${id}`; 

            await axios.delete(apiUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Remove o assinante da lista localmente
            setSubscribers(subscribers.filter(sub => sub.id !== id));
            alert('Assinante deletado com sucesso.');

        } catch (err) {
            console.error('Erro ao deletar assinante:', err);
            setError('Erro ao deletar assinante. Verifique o console.');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="text-center p-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                <p className="mt-2 text-gray-600">Carregando assinantes...</p>
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Gerenciamento de Assinantes ({subscribers.length})</h2>
            
            {subscribers.length === 0 ? (
                <p className="text-gray-500">Nenhum assinante cadastrado ou encontrado.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead>E-mail</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Inscrito Em</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.map((subscriber) => (
                                <TableRow key={subscriber.id}>
                                    <TableCell className="font-medium">{subscriber.id}</TableCell>
                                    <TableCell>{subscriber.email}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            subscriber.status === 'subscribed' ? 'bg-green-100 text-green-800' :
                                            subscriber.status === 'unsubscribed' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {subscriber.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleDelete(subscriber.id)}
                                            disabled={deletingId === subscriber.id}
                                        >
                                            {deletingId === subscriber.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default SubscriberList;