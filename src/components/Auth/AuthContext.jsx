// my-react-app/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; //  npm install jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); //  indicar que a verificação inicial está ocorrendo

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserRole = localStorage.getItem('userRole'); // manter a role separada

        if (storedToken && storedUserRole) {
            try {
                const decodedUser = jwtDecode(storedToken); // Decodifica o token para obter os dados do usuário
                // Se o token tiver expiração:
                // if (decodedUser.exp * 1000 < Date.now()) {
                //     // Token expirado
                //     handleLogout();
                //     return;
                // }

                setUser({ ...decodedUser, role: storedUserRole }); // Combina o que vem do token com a role do localStorage
                setToken(storedToken);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Erro ao decodificar token do localStorage:', error);
                // Se o token for inválido, limpa o localStorage
                handleLogout();
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = (authToken, userRole) => {
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userRole', userRole); // Salva a role também
        const decodedUser = jwtDecode(authToken);
        setUser({ ...decodedUser, role: userRole });
        setToken(authToken);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    // Objeto de valor para o contexto
    const authContextValue = {
        user,
        token,
        isAuthenticated,
        loading, // Expor loading para que os componentes saibam quando a verificação inicial terminou
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};