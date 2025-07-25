// src/components/Admin/EventForm.jsx

// npx shadcn@latest add button
// npx shadcn@latest add card
// npx shadcn@latest add input (se não estiver já por causa da Newsletter)
// npm install lucide-react (se não estiver já)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox'; // Para o is_published

function EventForm({ onFormSubmit, initialData = {}, onCancel }) {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        event_date: '', // Formato "YYYY-MM-DDTHH:MM" para datetime-local
        event_time: '', // Opcional, se quiser separar
        image_url: '',
        is_published: false,
        ...initialData // Preenche se for edição
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Se initialData for fornecido (modo de edição), atualize o estado
        if (initialData.id) {
            // Formatar event_date para datetime-local se for do BD
            if (initialData.event_date) {
                const date = new Date(initialData.event_date);
                initialData.event_date = date.toISOString().slice(0, 16);
            }
            setFormData({
                ...initialData,
                is_published: !!initialData.is_published // Converter para booleano
            });
        } else {
            // Limpar formulário se não for edição
            setFormData({
                title: '',
                description: '',
                location: '',
                event_date: '',
                event_time: '',
                image_url: '',
                is_published: false,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const eventDataToSend = {
                ...formData,
                // Garante que is_published seja 0 ou 1 para o DB SQLite
                is_published: formData.is_published ? 1 : 0
            };

            let response;
            if (formData.id) {
                // Atualizar evento existente
                response = await axios.put(`${import.meta.env.VITE_API_URL}/api/events/admin/${formData.id}`, eventDataToSend, config);
            } else {
                // Criar novo evento
                response = await axios.post(`${import.meta.env.VITE_API_URL}/api/events/admin`, eventDataToSend, config);
            }
            setMessage(response.data.message);
            onFormSubmit(); // Notifica o pai para atualizar a lista
        } catch (err) {
            console.error('Erro ao salvar evento:', err);
            setError(err.response?.data?.error || 'Erro ao salvar evento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-4">{formData.id ? 'Editar Evento' : 'Criar Novo Evento'}</h3>
            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Título do Evento</Label>
                    <Input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="location">Local</Label>
                    <Input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="event_date">Data e Hora do Evento</Label>
                    <Input
                        id="event_date"
                        type="datetime-local" // Importante para data e hora
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="event_time">Hora (Opcional, se separada)</Label>
                    <Input
                        id="event_time"
                        type="text"
                        placeholder="Ex: 14:00 - 16:00"
                        value={formData.event_time}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="image_url">URL da Imagem</Label>
                    <Input
                        id="image_url"
                        type="url"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="external_link">Link Externo (Inscrição, Info, etc.)</Label>
                    <Input
                        id="external_link"
                        type="url"
                        placeholder="https://example.com"
                        value={formData.external_link}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <Label htmlFor="category">Categoria do Evento</Label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="Espetáculo">Espetáculo</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Debate">Debate</option>
                        <option value="Residência">Residência</option>
                        <option value="Outro">Outro</option>
                    </select>
                    </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is_published"
                        checked={formData.is_published}
                        onCheckedChange={(checked) => handleChange({ target: { id: 'is_published', type: 'checkbox', checked }})}
                    />
                    <Label htmlFor="is_published">Publicar Evento (Visível ao público)</Label>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'A Salvar...' : (formData.id ? 'Atualizar Evento' : 'Criar Evento')}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EventForm;