// my-react-app/src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NewsletterSubscribe from './components/Forms/NewsletterSubscribe';
import AdminLogin from './components/Auth/AdminLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminRegister from './components/Auth/AdminRegister';
import { AuthProvider, useAuth } from './components/Auth/AuthContext'; 
import CreateNewsletter from './components/Forms/CreateNewsletter'; 
import NewsletterList from './components/Forms/NewsletterList';
import NewsletterForm from './components/Forms/NewsletterForm';
import '/src/components/Styles/Custom.css';


// páginas para o menu
import WhatWeDoPage from './pages/WhatWeDoPage';
import ArtisticCreationPage from './pages/WhatWeDo/ArtisticCreationPage';
import TrainingPage from './pages/WhatWeDo/TrainingPage';
import CulturalExchangesPage from './pages/WhatWeDo/CulturalExchangesPage';
import CultureDefensePage from './pages/WhatWeDo/CultureDefensePage';
import HowWeThinkPage from './pages/HowWeThinkPage';
import WhoWeArePage from './pages/WhoWeArePage';
import WhereWeWillBePage from './pages/WhereWeWillBePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';

// Componente ProtectedRoute para encapsular rotas que exigem autenticação e/ou role específica
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth(); // ela usa o hook do AuthContext

    if (loading) {
        return <div>Carregando autenticação...</div>; // Ou um spinner/loading screen
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redireciona se o usuário não tiver a role permitida
        return <Navigate to="/access-denied" replace />; // página para acesso negado futura
    }

    return children;
};


function AppContent() {
    const { isAuthenticated, user, login, logout } = useAuth();      // hook do AuthContext
    const navigate = useNavigate();

    // handleAdminLoginSuccess agora vem do contexto
    const handleAdminLoginSuccess = (token, role, userData) => { //   recebe token e role
        login(token, role, userData); // Chama a função login do contexto
        navigate('/admin/dashboard');
    };

    // handleLogout agora vem do contexto
    const handleLogout = () => {
        logout(); // Chama a função logout do contexto
        navigate('/admin/login');
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} userRole={user ? user.role : null} />

           

            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/subscribe" element={<NewsletterSubscribe />} />

                    <Route
                        path="/admin/login"
                        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />}
                    />

                    <Route
                        path="/admin/register"
                        element={<AdminRegister />} // N protegem registro, mas o backend exige isAdmin
                    />

                    {/*    Rotas Protegidas */}
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard /> {/* AdminDashboard agora pega userRole do AuthContext */}
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/newsletters/create" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <CreateNewsletter />
                        </ProtectedRoute>
                    } />
                    
                    {/* Nrota para listar */}
                    <Route
                    path="/admin/newsletters"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                        <NewsletterList />
                        </ProtectedRoute>
                    }
                    />

                    {/* Rota para edição – o mesmo formulário, mas com ID */}
                    <Route
                    path="/admin/newsletters/edit/:id"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                        {/* preciso adaptar createNewsletter para receber um ID e carregar os dados */}
                         <NewsletterForm /> 
                        </ProtectedRoute>
                    }
                    />

                     {/* Novas Rotas para o Menu Principal */}
                    <Route path="/about" element={<HomePage />} /> {/* Pode ser a homepage ou uma página específica "Sobre" */}
                    <Route path="/what-we-do" element={<WhatWeDoPage />} />
                    <Route path="/what-we-do/artistic-creation" element={<ArtisticCreationPage />} />
                    <Route path="/what-we-do/training" element={<TrainingPage />} />
                    <Route path="/what-we-do/cultural-exchanges" element={<CulturalExchangesPage />} />
                    <Route path="/what-we-do/culture-defense" element={<CultureDefensePage />} />
                    <Route path="/how-we-think" element={<HowWeThinkPage />} />
                    <Route path="/who-we-are" element={<WhoWeArePage />} />
                    <Route path="/where-we-will-be" element={<WhereWeWillBePage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Rota para 404 (Not Found) - Mantenha por último */}
                    <Route path="*" element={<NotFoundPage />} />


                    {/*  rota para futurp gerenciar assinantes */}
                    {/* <Route path="/admin/subscribers" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageSubscribers />
                        </ProtectedRoute>
                    } /> */}

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

// O componente principal da aplicação deve estar envolvido pelo Router e AuthProvider
function App() {
    return (
        <Router>
            <AuthProvider> {/* Envolver com AuthProvider */}
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;







/*
V1 -----  sem AuthContext para criar Newsletter


import React, { useState, useEffect } from 'react';
import NewsletterSubscribe from './components/Forms/NewsletterSubscribe'; // Importa o componente
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AdminLogin from './components/Auth/AdminLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Header from './components/Layout/Header'; 
import Footer from './components/Layout/Footer'; 
import AdminRegister from './components/Auth/AdminRegister';

function AppContent() {

   // useNavigate é um hook do react-router-dom para navegação programática
  const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Estado para a role do usuário

   useEffect(() => {
    // Verifica o token e a role no localStorage ao carregar a aplicação
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      // Aqui você poderia adicionar uma validação de token no backend
      // para garantir que ele ainda é válido antes de autenticar.
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  

   // Função chamada quando o login é bem-sucedido
    const handleAdminLoginSuccess = (user) => {
        setIsAuthenticated(true);
        setUserRole(user.role);
        console.log('Login de admin bem-sucedido. Redirecionando para o dashboard.');
        navigate('/admin/dashboard');
    };

    // Função para logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/admin/login'); // Redireciona para o login após o logout
    };

  return (
      <div style={{
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} userRole={userRole} />

            <h1>Sistema de Gestão da Associação</h1>

            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<NewsletterSubscribe />} />
                    <Route path="/subscribe" element={<NewsletterSubscribe />} />

                    <Route
                        path="/admin/login"
                        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />}
                    />

                    <Route
                        path="/admin/register"
                        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminRegister />}
                    />

                    <Route
                        path="/admin/dashboard"
                        element={isAuthenticated ? <AdminDashboard userRole={userRole} /> : <Navigate to="/admin/login" replace />}
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

// O componente principal da aplicação deve estar envolvido pelo Router e AuthProvider
function App() {
  return (
    <Router>
      <AuthProvider>
          <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App; // Exportamos AppWrapper

*/