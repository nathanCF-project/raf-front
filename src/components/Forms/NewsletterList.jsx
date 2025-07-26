// src/components/Admin/NewsletterList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';

// Importações dos componentes Shadcn UI
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'; // Para a tabela
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'; // Para o modal (agendamento)
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'; // Para o dropdown de tipo de agendamento

// Remover o import do CSS antigo e do React-Bootstrap
// import '../styles/AdminDashboard.css';
// import { Modal, Button, Form } from 'react-bootstrap';


const NewsletterList = () => {
    const { token } = useAuth();
    const [newsletters, setNewsletters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedNewsletterId, setSelectedNewsletterId] = useState(null);
    const [scheduledDateTime, setScheduledDateTime] = useState('');
    const [scheduleType, setScheduleType] = useState('once'); // 'once', 'daily', 'weekly', 'monthly', 'custom_interval'
    const [scheduleInterval, setScheduleInterval] = useState(1); // Para custom_interval ou outros

    const fetchNewsletters = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/newsletter/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewsletters(response.data);
        } catch (err) {
            console.error('Erro ao buscar newsletters:', err);
            setError(err.response?.data?.error || 'Erro ao carregar newsletters.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchNewsletters();
        }
    }, [token]);

    const handleSendNewsletter = async (id) => {
        if (window.confirm('Tem certeza que deseja ENVIAR esta newsletter para todos os assinantes?')) {
            setMessage('');
            setError('');
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/send/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchNewsletters(); // Recarregar a lista para atualizar o status
            } catch (err) {
                console.error('Erro ao enviar newsletter:', err);
                setError(err.response?.data?.error || 'Erro ao enviar newsletter.');
            }
        }
    };

    const handleDeleteNewsletter = async (id, title) => {
        if (window.confirm(`Tem certeza que deseja DELETAR a newsletter "${title}"? Esta ação é irreversível.`)) {
            setMessage('');
            setError('');
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchNewsletters(); // Recarregar a lista
            } catch (err) {
                console.error('Erro ao deletar newsletter:', err);
                setError(err.response?.data?.error || 'Erro ao deletar newsletter.');
            }
        }
    };

    const handleShowScheduleModal = (id) => {
        setSelectedNewsletterId(id);
        const nl = newsletters.find(n => n.id === id);
        if (nl && nl.next_scheduled_send) { // Use next_scheduled_send para pré-preencher
            const date = new Date(nl.next_scheduled_send);
            const formattedDate = date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
            setScheduledDateTime(formattedDate);
            setScheduleType(nl.schedule_type || 'once');
            setScheduleInterval(nl.schedule_interval || 1);
        } else {
            setScheduledDateTime('');
            setScheduleType('once');
            setScheduleInterval(1);
        }
        setShowScheduleModal(true);
    };

    const handleCloseScheduleModal = () => {
        setShowScheduleModal(false);
        setSelectedNewsletterId(null);
        setScheduledDateTime('');
        setScheduleType('once');
        setScheduleInterval(1);
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!scheduledDateTime) {
            setError('Por favor, selecione uma data e hora para o agendamento.');
            return;
        }

        const payload = {
            scheduled_at: new Date(scheduledDateTime).toISOString(), // Enviar em formato ISO
            schedule_type: scheduleType,
            schedule_interval: scheduleType !== 'once' ? parseInt(scheduleInterval) : null
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/schedule/${selectedNewsletterId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
            fetchNewsletters(); // Recarregar a lista para ver o status "scheduled"
            handleCloseScheduleModal();
        } catch (err) {
            console.error('Erro ao agendar newsletter:', err);
            setError(err.response?.data?.error || 'Erro ao agendar newsletter.');
        }
    };

    const handleCancelSchedule = async (id) => {
        if (window.confirm('Tem certeza que deseja CANCELAR o agendamento desta newsletter?')) {
            setMessage('');
            setError('');
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/schedule/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchNewsletters(); // Recarregar a lista para ver o status atualizado
            } catch (err) {
                console.error('Erro ao cancelar agendamento:', err);
                setError(err.response?.data?.error || 'Erro ao cancelar agendamento.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Carregando newsletters...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Gerenciar Newsletters</h2>
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{message}</span>
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {newsletters.length === 0 ? (
                <p className="text-center text-gray-600">
                    Nenhuma newsletter criada ainda. <Link to="/admin/newsletters/create" className="text-blue-600 hover:underline">Crie uma agora!</Link>
                </p>
            ) : (
                <div className="overflow-x-auto rounded-md border"> {/* Container para tabela com scroll horizontal */}
                    <Table className="min-w-full divide-y divide-gray-200"> {/* Usar componente Table do Shadcn */}
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título Interno</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assunto</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Envio</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado Em</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próximo Envio Agendado</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white divide-y divide-gray-200">
                            {newsletters.map((nl) => (
                                <TableRow key={nl.id}>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nl.id}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{nl.title}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{nl.subject}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            nl.status === 'sent' ? 'bg-green-100 text-green-800' :
                                            nl.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {nl.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {nl.sent_at ? new Date(nl.sent_at).toLocaleString('pt-PT') : 'Nunca'}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(nl.created_at).toLocaleString('pt-PT')}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {nl.next_scheduled_send ? new Date(nl.next_scheduled_send).toLocaleString('pt-PT') : 'Não Agendado'}
                                        {nl.schedule_type && nl.schedule_type !== 'once' && (
                                            <span className="block text-xs text-gray-400">
                                                ({nl.schedule_type}{nl.schedule_interval ? ` a cada ${nl.schedule_interval}` : ''})
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"> {/* Espaçamento entre botões */}
                                        <Link to={`/admin/newsletters/edit/${nl.id}`}>
                                            <Button variant="outline" size="sm">Editar</Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleSendNewsletter(nl.id)}
                                            variant="secondary"
                                            size="sm"
                                            disabled={nl.status === 'sent'}
                                        >
                                            Enviar Agora
                                        </Button>
                                        <Button
                                            onClick={() => handleShowScheduleModal(nl.id)}
                                            variant="outline"
                                            size="sm"
                                            // Desabilitar se já foi enviada e não é recorrente. Ou se já está agendada e é recorrente
                                            disabled={nl.status === 'sent' && nl.schedule_type === 'once'}
                                        >
                                            {nl.status === 'scheduled' ? 'Reagendar' : 'Agendar'}
                                        </Button>
                                        {nl.status === 'scheduled' && (
                                            <Button
                                                onClick={() => handleCancelSchedule(nl.id)}
                                                variant="destructive"
                                                size="sm"
                                            >
                                                Cancelar Agendamento
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => handleDeleteNewsletter(nl.id, nl.title)}
                                            variant="destructive"
                                            size="sm"
                                        >
                                            Deletar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Modal para agendamento (Shadcn Dialog) */}
            <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
                <DialogContent className="sm:max-w-[425px]"> {/* Tamanho do modal */}
                    <DialogHeader>
                        <DialogTitle>Agendar Newsletter</DialogTitle>
                        <DialogDescription>
                            Configure a data, hora e tipo de agendamento para esta newsletter.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleScheduleSubmit} className="grid gap-4 py-4">
                        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                        <div className="grid gap-2">
                            <Label htmlFor="scheduledDateTime">Data e Hora de Envio Inicial:</Label>
                            <Input
                                id="scheduledDateTime"
                                type="datetime-local"
                                value={scheduledDateTime}
                                onChange={(e) => setScheduledDateTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="scheduleType">Tipo de Agendamento:</Label>
                            <Select value={scheduleType} onValueChange={setScheduleType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="once">Uma única vez</SelectItem>
                                    <SelectItem value="daily">Diariamente</SelectItem>
                                    <SelectItem value="weekly">Semanalmente</SelectItem>
                                    <SelectItem value="monthly">Mensalmente</SelectItem>
                                    {/* <SelectItem value="custom_interval">Intervalo Customizado (dias)</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>

                        {(scheduleType !== 'once') && (
                            <div className="grid gap-2">
                                <Label htmlFor="scheduleInterval">Intervalo (a cada X dias/semanas/meses):</Label>
                                <Input
                                    id="scheduleInterval"
                                    type="number"
                                    min="1"
                                    value={scheduleInterval}
                                    onChange={(e) => setScheduleInterval(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Para Diariamente: X dias; Semanalmente: X semanas; Mensalmente: X meses.
                                </p>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit">Confirmar Agendamento</Button>
                            <Button type="button" variant="outline" onClick={handleCloseScheduleModal}>
                                Fechar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewsletterList;



/*
sem tailwind shadcn apenas css e BOOTSTRAP

// my-react-app/src/components/Admin/NewsletterList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css'; 
import { Modal, Button, Form } from 'react-bootstrap';

const NewsletterList = () => {
    const { token } = useAuth();
    const [newsletters, setNewsletters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedNewsletterId, setSelectedNewsletterId] = useState(null);
    const [scheduledDateTime, setScheduledDateTime] = useState('');
    const [scheduleType, setScheduleType] = useState('once'); // 'once', 'daily', 'weekly', 'monthly', 'custom_interval'
    const [scheduleInterval, setScheduleInterval] = useState(1); // Para custom_interval ou outros

    const fetchNewsletters = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/newsletter/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewsletters(response.data);
        } catch (err) {
            console.error('Erro ao buscar newsletters:', err);
            setError(err.response?.data?.error || 'Erro ao carregar newsletters.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchNewsletters();
        }
    }, [token]); // Recarrega se o token mudar (login/logout)

    const handleSendNewsletter = async (id) => {
        if (window.confirm('Tem certeza que deseja ENVIAR esta newsletter para todos os assinantes?')) {
            setMessage('');
            setError('');
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/send/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchNewsletters(); // Recarregar a lista para atualizar o status
            } catch (err) {
                console.error('Erro ao enviar newsletter:', err);
                setError(err.response?.data?.error || 'Erro ao enviar newsletter.');
            }
        }
    };

    const handleDeleteNewsletter = async (id, title) => {
        if (window.confirm(`Tem certeza que deseja DELETAR a newsletter "${title}"? Esta ação é irreversível.`)) {
            setMessage('');
            setError('');
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchNewsletters(); // Recarregar a lista
            } catch (err) {
                console.error('Erro ao deletar newsletter:', err);
                setError(err.response?.data?.error || 'Erro ao deletar newsletter.');
            }
        }
    };

     const handleShowScheduleModal = (id) => {
        setSelectedNewsletterId(id);
        // Preencher com a data/hora agendada existente se houver (opcional)
        const nl = newsletters.find(n => n.id === id);
        if (nl && nl.scheduled_at) {
            // Formatar a data para o input datetime-local
            const date = new Date(nl.scheduled_at);
            const formattedDate = date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
            setScheduledDateTime(formattedDate);
            setScheduleType(nl.schedule_type || 'once');
            setScheduleInterval(nl.schedule_interval || 1);
        } else {
            setScheduledDateTime('');
            setScheduleType('once');
            setScheduleInterval(1);
        }
        setShowScheduleModal(true);
    };

    const handleCloseScheduleModal = () => {
        setShowScheduleModal(false);
        setSelectedNewsletterId(null);
        setScheduledDateTime('');
        setScheduleType('once');
        setScheduleInterval(1);
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!scheduledDateTime) {
            setError('Por favor, selecione uma data e hora para o agendamento.');
            return;
        }

        const payload = {
            scheduled_at: new Date(scheduledDateTime).toISOString(), // Enviar em formato ISO
            schedule_type: scheduleType,
            schedule_interval: scheduleType !== 'once' ? parseInt(scheduleInterval) : null
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/schedule/${selectedNewsletterId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
            fetchNewsletters(); // Recarregar a lista para ver o status "scheduled"
            handleCloseScheduleModal();
        } catch (err) {
            console.error('Erro ao agendar newsletter:', err);
            setError(err.response?.data?.error || 'Erro ao agendar newsletter.');
        }
    };

    const handleCancelSchedule = async (id) => {
        if (window.confirm('Tem certeza que deseja CANCELAR o agendamento desta newsletter?')) {
            setMessage('');
            setError('');
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/newsletter/admin/schedule/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                fetchNewsletters(); // Recarregar a lista para ver o status atualizado
            } catch (err) {
                console.error('Erro ao cancelar agendamento:', err);
                setError(err.response?.data?.error || 'Erro ao cancelar agendamento.');
            }
        }
    };

    // Renderização dos cards de newsletter ou tabela
    if (loading) {
        return <div className="admin-content"><p>Carregando newsletters...</p></div>;
    }

    return (
        <div className="admin-content">
            <h2>Gerenciar Newsletters</h2>
            {message && <p className="alert alert-success">{message}</p>} 
            {error && <p className="alert alert-danger">{error}</p>}

            {newsletters.length === 0 ? (
                <p>Nenhuma newsletter criada ainda. <Link to="/admin/newsletters/create">Crie uma agora!</Link></p>
            ) : (
                <table className="table table-striped admin-table"> 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título Interno</th>
                            <th>Assunto</th>
                            <th>Status</th>
                            <th>Último Envio</th>
                            <th>Criado Em</th>
                            <th>Próximo Envio Agendado</th> 
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsletters.map((nl) => (
                            <tr key={nl.id}>
                                <td>{nl.id}</td>
                                <td>{nl.title}</td>
                                <td>{nl.subject}</td>
                                <td>{nl.status}</td>
                                <td>{nl.sent_at ? new Date(nl.sent_at).toLocaleString() : 'Nunca'}</td>
                                <td>{new Date(nl.created_at).toLocaleString()}</td>
                                <td>
                                    {nl.next_scheduled_send ? new Date(nl.next_scheduled_send).toLocaleString() : 'Não Agendado'}
                                    {nl.schedule_type && nl.schedule_type !== 'once' && ` (${nl.schedule_type}${nl.schedule_interval ? ` a cada ${nl.schedule_interval}` : ''})`}
                                </td>
                                <td className="actions-column">
                                    <Link to={`/admin/newsletters/edit/${nl.id}`} className="btn btn-info btn-sm me-2">Editar</Link>
                                    <Button
                                        onClick={() => handleSendNewsletter(nl.id)}
                                        className="btn btn-success btn-sm me-2"
                                        disabled={nl.status === 'sent'}
                                    >
                                        Enviar Agora
                                    </Button>
                                    <Button
                                        onClick={() => handleShowScheduleModal(nl.id)}
                                        className="btn btn-warning btn-sm me-2"
                                        disabled={nl.status === 'sent' && nl.schedule_type === 'once'} // Não pode reagendar se já foi enviada e não é recorrente
                                    >
                                        {nl.status === 'scheduled' ? 'Reagendar' : 'Agendar'}
                                    </Button>
                                    {nl.status === 'scheduled' && (
                                        <Button
                                            onClick={() => handleCancelSchedule(nl.id)}
                                            className="btn btn-secondary btn-sm me-2"
                                        >
                                            Cancelar Agendamento
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => handleDeleteNewsletter(nl.id, nl.title)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            
            <Modal show={showScheduleModal} onHide={handleCloseScheduleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agendar Newsletter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p className="alert alert-danger">{error}</p>}
                    <Form onSubmit={handleScheduleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Data e Hora de Envio Inicial:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={scheduledDateTime}
                                onChange={(e) => setScheduledDateTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Agendamento:</Form.Label>
                            <Form.Select
                                value={scheduleType}
                                onChange={(e) => setScheduleType(e.target.value)}
                            >
                                <option value="once">Uma única vez</option>
                                <option value="daily">Diariamente</option>
                                <option value="weekly">Semanalmente</option>
                                <option value="monthly">Mensalmente</option>
                                {/* <option value="custom_interval">Intervalo Customizado (dias)</option> 
                            </Form.Select>
                        </Form.Group>

                        {(scheduleType !== 'once') && ( // Mostrar intervalo apenas para recorrentes
                            <Form.Group className="mb-3">
                                <Form.Label>Intervalo (a cada X dias/semanas/meses):</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={scheduleInterval}
                                    onChange={(e) => setScheduleInterval(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Para Diariamente: X dias; Semanalmente: X semanas; Mensalmente: X meses.
                                </Form.Text>
                            </Form.Group>
                        )}

                        <Button variant="primary" type="submit">
                            Confirmar Agendamento
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseScheduleModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewsletterList;

*/