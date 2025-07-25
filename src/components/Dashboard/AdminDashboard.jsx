// my-react-app/src/components/Dashboard/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ContactList from './ContactList'; // Presume que ContactList também será atualizado com Tailwind
import ContactForm from '../Forms/ContactForm'; // Presume que ContactForm também será atualizado com Tailwind
import { useAuth } from '../Auth/AuthContext';

// Componentes Shadcn UI
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator'; // Importar Separator para as linhas horizontais

// Importações para Eventos
import EventList from '../Forms/EventList';
import EventForm from '../Forms/EventForm';



function AdminDashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, logout } = useAuth();

    const [showContactForm, setShowContactForm] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [refreshContactList, setRefreshContactList] = useState(false);

    // Estados para gerenciamento de eventos
    const [showEventForm, setShowEventForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [refreshEventList, setRefreshEventList] = useState(false);

    const handleLogout = () => {
        logout(); // Usa a função logout do AuthContext
        navigate('/admin/login'); // Redireciona para o login após logout
    };

    const handleContactFormSubmitSuccess = () => {
        setShowContactForm(false);
        setEditingContact(null);
        setRefreshContactList(prev => !prev);
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setShowContactForm(true);
    };

    const handleCancelForm = () => {
        setShowContactForm(false);
        setEditingContact(null);
    };

     // Handlers para Eventos
    const handleEventFormSubmitSuccess = () => {
        setShowEventForm(false);
        setEditingEvent(null);
        setRefreshEventList(prev => !prev); // Dispara a atualização da lista
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setShowEventForm(true);
    };

    const handleCancelEventForm = () => {
        setShowEventForm(false);
        setEditingEvent(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px-96px)] bg-gray-100 p-4">
                <p className="text-lg font-medium text-gray-700">Verificando acesso ao Dashboard...</p>
            </div>
        );
    }

    // Essa checagem é uma redundância útil, embora ProtectedRoute já trate.
    if (!user || user.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px-96px)] bg-gray-100 p-4 text-center">
                <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-red-600">Acesso Negado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700">Você não tem permissão para acessar esta página.</p>
                        <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white">
                            Ir para Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:px-6 lg:px-8 my-10"> {/* Contêiner responsivo com margem */}
            <Card className="w-full p-6 shadow-lg rounded-lg bg-white">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                        Bem-vindo, {user.name} (<span className="text-amber-500">{user.role}</span>)!
                    </CardTitle>
                    <p className="text-gray-600">Este é o seu painel de administração.</p>
                </CardHeader>

                <CardContent className="mt-8 space-y-4"> {/* Espaçamento entre seções */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Layout de botões responsivo */}
                        <Button
                            onClick={() => { setShowContactForm(true); setEditingContact(null); }}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2"
                        >
                            Adicionar Novo Contato
                        </Button>

                        <Link to="/admin/subscribers">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">
                                Gerenciar Assinantes / Exportar/Importar (Em breve)
                            </Button>
                        </Link>
                        <Link to="/admin/newsletters/create">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">
                                Criar Newsletter
                            </Button>
                        </Link>
                        <Link to="/admin/newsletters">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2">
                                Gerenciar Newsletters Existentes
                            </Button>
                        </Link>
                        <Button
                            onClick={() => { setShowEventForm(true); setEditingEvent(null); }}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2"
                        >
                            Criar Novo Evento
                        </Button>
                    </div>

                    {/* Seção de Formulário de Eventos */}
                    {showEventForm && (
                        <>
                            <Separator className="my-8" />
                            <EventForm
                                onFormSubmit={handleEventFormSubmitSuccess}
                                initialData={editingEvent || {}}
                                onCancel={handleCancelEventForm}
                            />
                            <Separator className="my-8" />
                        </>
                    )}

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Gestão de Eventos</h3>
                    {/* Componente para listar e gerenciar eventos */}
                    <EventList refreshTrigger={refreshEventList} onEditEvent={handleEditEvent} />


                    {showContactForm && (
                        <>
                            <Separator className="my-8" /> {/* Linha divisória Shadcn */}
                            <ContactForm
                                onFormSubmit={handleContactFormSubmitSuccess}
                                initialData={editingContact || {}}
                            />
                            <Button
                                onClick={handleCancelForm}
                                variant="outline" // Estilo de botão "outline" do Shadcn
                                className="w-full mt-4 border-gray-400 text-gray-700 hover:bg-gray-100"
                            >
                                Cancelar
                            </Button>
                            <Separator className="my-8" />
                        </>
                    )}

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Gestão de Contatos</h3>
                    <ContactList refreshTrigger={refreshContactList} onEditContact={handleEditContact} />

                    <Button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 mt-8"
                    >
                        Sair do Dashboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminDashboard;




/*  funcional mas sem adaptacao tailwind shadcn ui

// my-react-app/src/components/Dashboard/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ContactList from './ContactList';
import ContactForm from '../Forms/ContactForm';
import { useAuth } from '../Auth/AuthContext';

function AdminDashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, logout } = useAuth(); //  hook do AuthContext

    // Os estados relacionados a showContactForm, editingContact, refreshContactList permanecem
    const [showContactForm, setShowContactForm] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [refreshContactList, setRefreshContactList] = useState(false);

    // O useEffect para verificar login pode ser removido, pois ProtectedRoute e AuthContext já fazem isso
    // e o user/isAuthenticated já virão prontos do contexto.
    // O que antes estava no useEffect:
    // if (!isAuthenticated || user.role !== 'admin') {
    //   navigate('/admin/login');
    // }
    // Essa lógica agora é controlada pelo <ProtectedRoute> no App.jsx

    const handleLogout = () => {
        logout(); // Usa a função logout do AuthContext
        // navigate('/admin/login'); // O logout do contexto já pode lidar com o redirecionamento ou você pode mantê-lo aqui
    };

    const handleContactFormSubmitSuccess = () => {
        setShowContactForm(false);
        setEditingContact(null);
        setRefreshContactList(prev => !prev);
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setShowContactForm(true);
    };

    const handleCancelForm = () => {
        setShowContactForm(false);
        setEditingContact(null);
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
                <p>Verificando acesso ao Dashboard...</p>
            </div>
        );
    }

    // Se o usuário não for admin (embora o ProtectedRoute já devesse ter lidado com isso, é uma checagem extra)
    if (!user || user.role !== 'admin') {
        return (
            <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
                <p>Acesso negado. Você não tem permissão para acessar esta página.</p>
                <button onClick={handleLogout}>Ir para Login</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
            <h2>Bem-vindo, {user.name} ({user.role})!</h2> 
            <p>Este é o seu painel de administração.</p>

            <div style={{ marginTop: '30px', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button
                    onClick={() => { setShowContactForm(true); setEditingContact(null); }}
                    style={{ padding: '10px 15px', backgroundColor: '#21a0a0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
                >
                    Adicionar Novo Contato
                </button>

                <Link to="/admin/subscribers" style={{ /* sestilos  }}>
                    <button style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>
                        Gerenciar Assinantes / Exportar importar (Em breve)
                    </button>
                </Link>
                <Link to="/admin/newsletters/create" style={{ /*estilos de link/botão  }}>
                    <button style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>
                        Criar Newsletter
                    </button>
                </Link>
                 <Link to="/admin/newsletters" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '10px 15px', backgroundColor: '#e44d26', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em', width: '100%' }}>
                    Gerenciar Newsletters Existentes
                </button>
            </Link>
            </div>

            {showContactForm && (
                <>
                    <ContactForm
                        onFormSubmit={handleContactFormSubmitSuccess}
                        initialData={editingContact || {}}
                    />
                    <button
                        onClick={handleCancelForm}
                        style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em', marginTop: '10px' }}
                    >
                        Cancelar
                    </button>
                    <hr style={{ margin: '40px 0', borderColor: '#eee' }}/>
                </>
            )}

            <hr style={{ margin: '40px 0', borderColor: '#eee' }}/>
            <h3>Gestão de Contatos</h3>
            <ContactList refreshTrigger={refreshContactList} onEditContact={handleEditContact} />

            <button
                onClick={handleLogout}
                style={{ marginTop: '40px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
            >
                Sair
            </button>
        </div>
    );
}

export default AdminDashboard;

*/








