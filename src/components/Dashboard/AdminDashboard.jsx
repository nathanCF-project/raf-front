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
            <h2>Bem-vindo, {user.name} ({user.role})!</h2> {/* Pega o nome e role do user do contexto */}
            <p>Este é o seu painel de administração.</p>

            <div style={{ marginTop: '30px', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button
                    onClick={() => { setShowContactForm(true); setEditingContact(null); }}
                    style={{ padding: '10px 15px', backgroundColor: '#21a0a0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
                >
                    Adicionar Novo Contato
                </button>

                {/* Agora com Link do react-router-dom */}
                <Link to="/admin/subscribers" style={{ /* sestilos */ }}>
                    <button style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>
                        Gerenciar Assinantes / Exportar importar (Em breve)
                    </button>
                </Link>
                <Link to="/admin/newsletters/create" style={{ /*estilos de link/botão */ }}>
                    <button style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>
                        Criar Newsletter
                    </button>
                </Link>
                 <Link to="/admin/newsletters" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '10px 15px', backgroundColor: '#e44d26', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em', width: '100%' }}>
                    Gerenciar Newsletters Existentes
                </button>
            </Link>
                {/* link para "Exportar/Importar" aqui também, se desejar */}
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









/*
V1 -----  function admindashboard antes de ser adaptado ao authcontext para usar useAuth()

function AdminDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showContactForm, setShowContactForm] = useState(false); //adicionar contato
  const [editingContact, setEditingContact] = useState(null);
  const [refreshContactList, setRefreshContactList] = useState(false);  

  // useEffect para verificar o status de login ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole'); // Pega a role do localStorage

    if (!token || role !== 'admin') {
      // Se não houver token ou a role não for 'admin', redireciona para o login
      console.log('Acesso negado. Redirecionando para a página de login.');
      navigate('/admin/login');
    } else {
      // Se estiver logado e for admin, tenta decodificar o token para pegar o nome
      // Em um projeto real, você faria uma requisição ao backend para obter os dados do usuário logado
      // Por enquanto, vamos simular que o token guarda o nome
      try {
        // ATENÇÃO: Decodificar JWT no frontend é apenas para display!
        // Não use isso para lógica de segurança. A segurança é feita no backend.
        // Aqui, estamos apenas pegando o nome para uma mensagem de boas-vindas.
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64)); // 'atob' decodifica Base64
        setUserName(decodedPayload.name || 'Administrador');
        setUserRole(role);
      } catch (error) {
        console.error('Erro ao decodificar token no frontend:', error);
        // Se houver erro ao decodificar, redireciona para login por segurança
        navigate('/admin/login');
      }
    }
  }, [navigate]); // O array vazio garante que o useEffect rode apenas uma vez (ao montar o componente)


  const handleLogout = () => {
    // Limpa o token e a role do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    console.log('Usuário deslogado. Redirecionando para a página de login.');
    navigate('/admin/login'); // Redireciona para a página de login após o logout
  };

  // Função para lidar com o sucesso do envio do formulário (adição/edição)
  const handleContactFormSubmitSuccess = () => {
    setShowContactForm(false); // Esconde o formulário
    setEditingContact(null); // Limpa o contato em edição
    setRefreshContactList(prev => !prev); // Força o ContactList a recarregar
  };

  // Função para iniciar a edição
  const handleEditContact = (contact) => { // <-- NOVA FUNÇÃO
    setEditingContact(contact); // Define o contato que será editado
    setShowContactForm(true); // Mostra o formulário
  };

  // Função para cancelar o formulário (seja adição ou edição)
  const handleCancelForm = () => { // <-- NOVA FUNÇÃO
    setShowContactForm(false);
    setEditingContact(null);
  };

  if (!userName) {
    // Exibe algo enquanto espera a verificação do login (ou redirecionamento)
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
        <p>Verificando acesso...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2>Bem-vindo, {userName} ({userRole})!</h2>
      <p>Este é o seu painel de administração.</p>

      <div style={{ marginTop: '30px', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <button
          onClick={() => { setShowContactForm(true); setEditingContact(null); }} // <-- Limpa editingContact ao adicionar novo
          style={{ padding: '10px 15px', backgroundColor: '#21a0a0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
        >
          Adicionar Novo Contato
        </button>
        
        <button
          onClick={() => console.log('Navegar para gestão de assinantes')}
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
        >
          Exportar/Importar (Em breve)
        </button>
        <button
          onClick={() => console.log('Navegar para gestão de contatos')}
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
        >
          Gerenciar Assinantes (Em breve)
        </button>
        <button
          onClick={() => console.log('Navegar para criação de newsletter')}
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
        >
          Criar Newsletter (Em breve)
        </button>
      </div>

      {showContactForm && ( // <--- Renderiza o formulário condicionalmente
        <>
          <ContactForm
            onFormSubmit={handleContactFormSubmitSuccess}
             initialData={editingContact || {}} // <-- PASSA O CONTATO A SER EDITADO
          />
          <button
            onClick={handleCancelForm} // <-- Botão de cancelar
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


