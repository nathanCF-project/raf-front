// my-react-app/src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// Remova a importação de '/src/components/Styles/Custom.css' se você está migrando para Tailwind/Shadcn UI
// import '/src/components/Styles/Custom.css'; 

import './translation/i18n';

// Importações de componentes de autenticação e dashboard
import AdminLogin from './components/Auth/AdminLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import AdminRegister from './components/Auth/AdminRegister';
import CreateNewsletter from './components/Forms/CreateNewsletter'; 
import NewsletterList from './components/Forms/NewsletterList';
import NewsletterForm from './components/Forms/NewsletterForm';

// Importações de layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Importação do AuthContext
import { AuthProvider, useAuth } from './components/Auth/AuthContext'; 

// Importações das páginas (mantenha todas as suas páginas)
import HomePage from './pages/HomePage';
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
import ProjectPage from './pages/Projects/ProjectPage'; 
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TranslationPage from './pages/TranslationPage';



// Componente ProtectedRoute (mantenha como está)
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth(); // usa o hook do AuthContext

    if (loading) {
        return <div>Carregando autenticação...</div>; // Ou um spinner/loading screen
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redireciona se o usuário não tiver a role permitida
        return <Navigate to="/access-denied" replace />; // página para acesso negado (você precisaria criar esta página)
    }

    return children;
};

// Mova todo o conteúdo da sua antiga AppContent diretamente para dentro da função App
function App() {
    return (
        <Router>
            <AuthProvider> {/* O AuthProvider deve envolver todo o conteúdo que precisa do contexto de autenticação */}
                <div className="flex flex-col min-h-screen"> {/* Classes Tailwind para layout */}
                    <Header /> {/* O Header agora não precisa de isAuthenticated, onLogout, userRole props, ele pode pegar do useAuth diretamente */}
                    
                    <main className="flex-1"> {/* Permite que o conteúdo principal ocupe o espaço restante */}
                        <Routes>
                            {/* Rotas Públicas */}
                            <Route path="/" element={<HomePage />} />
                            {/* Ajuste o path="/subscribe" se HomePage já tiver o NewsletterSubscribe */}
                            {/* Se você tiver uma página separada para a newsletter, mantenha esta rota */}
                            {/* <Route path="/subscribe" element={<NewsletterSubscribe />} /> */}
                            
                            {/* Rotas de Autenticação */}
                            <Route
                                path="/admin/login"
                                element={<AdminLogin />} // AdminLogin deve usar o `login` do AuthContext diretamente
                            />
                            <Route
                                path="/admin/register"
                                element={<AdminRegister />} // Não proteja o registro aqui, mas o backend exigirá isAdmin
                            />

                            {/* Rotas Protegidas (Admin) */}
                            <Route path="/admin/dashboard" element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminDashboard /> 
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/newsletters/create" element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <CreateNewsletter />
                                </ProtectedRoute>
                            } />
                            <Route
                                path="/admin/newsletters"
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <NewsletterList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/newsletters/edit/:id"
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <NewsletterForm /> 
                                    </ProtectedRoute>
                                }
                            />

                            {/* Rotas para o Menu Principal (Páginas estáticas/informacionais) */}
                            {/* Remova a rota /about se a HomePage já serve como a seção "Sobre" */}
                            {/* <Route path="/about" element={<HomePage />} /> */} 
                            <Route path="/what-we-do" element={<WhatWeDoPage />} />
                            <Route path="/what-we-do/artistic-creation" element={<ArtisticCreationPage />} />
                            <Route path="/what-we-do/training" element={<TrainingPage />} />
                            <Route path="/what-we-do/cultural-exchanges" element={<CulturalExchangesPage />} />
                            <Route path="/what-we-do/culture-defense" element={<CultureDefensePage />} />
                            <Route path="/how-we-think" element={<HowWeThinkPage />} />
                            <Route path="/who-we-are" element={<WhoWeArePage />} />
                            <Route path="/where-we-will-be" element={<WhereWeWillBePage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/artistic-creation/:id" element={<ProjectPage />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                            <Route path="/what-we-do/translation" element={<TranslationPage />} />
                           


                            {/* Rotas de fallback */}
                            {/* Se você tiver uma página NotFoundPage, use-a. Se não, o Navigate to "/" é um bom fallback */}
                            <Route path="/access-denied" element={<div>Acesso Negado. Você não tem permissão para ver esta página.</div>} />
                            <Route path="*" element={<NotFoundPage />} /> {/* Rota para 404 - Mantenha por último */}
                            {/* Se você não tem NotFoundPage, pode usar: <Route path="*" element={<Navigate to="/" replace />} /> */}
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;







/*
V2 -----  FUNCIONAL mas mal formatado para o tailwind css(appcontent)


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

                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard /> 
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/newsletters/create" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <CreateNewsletter />
                        </ProtectedRoute>
                    } />
                    
                    <Route
                    path="/admin/newsletters"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                        <NewsletterList />
                        </ProtectedRoute>
                    }
                    />

                    <Route
                    path="/admin/newsletters/edit/:id"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                         <NewsletterForm /> 
                        </ProtectedRoute>
                    }
                    />

                    <Route path="/about" element={<HomePage />} /> 
                    <Route path="/what-we-do" element={<WhatWeDoPage />} />
                    <Route path="/what-we-do/artistic-creation" element={<ArtisticCreationPage />} />
                    <Route path="/what-we-do/training" element={<TrainingPage />} />
                    <Route path="/what-we-do/cultural-exchanges" element={<CulturalExchangesPage />} />
                    <Route path="/what-we-do/culture-defense" element={<CultureDefensePage />} />
                    <Route path="/how-we-think" element={<HowWeThinkPage />} />
                    <Route path="/who-we-are" element={<WhoWeArePage />} />
                    <Route path="/where-we-will-be" element={<WhereWeWillBePage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="*" element={<NotFoundPage />} />


                    // <Route path="/admin/subscribers" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageSubscribers />
                        </ProtectedRoute>
                    } />   //  futura rota acesso aos subscribers

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

export default App;

*/