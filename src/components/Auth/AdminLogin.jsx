
// src/componentes/Auth/AdminLogin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json(); // { token, user }

      if (!res.ok) {
        setIsError(true);
        setMessage(data.error || "Credenciais inválidas.");
        return;
      }

      // avisa o AuthContext
      onLoginSuccess?.(data.token, data.user.role, data.user);
      setMessage("Login bem‑sucedido!");
    } catch (err) {
      console.error("Erro de rede:", err);
      setIsError(true);
      setMessage("Não foi possível contactar o servidor.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Login de Administrador</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E‑mail do administrador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "calc(100% - 22px)",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "calc(100% - 22px)",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "15px",
            color: isError ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Não tem uma conta de colaborador?{" "}
        <Link to="/admin/register">Registre‑se aqui</Link>
      </p>
    </div>
  );
}

export default AdminLogin;






/*
                          antes                                                                      depois
V1 -----   Gravavas authToken e userRole no localStorage dentro do componente.   --> Removido — agora o próprio AuthContext.login() (recebido via onLoginSuccess) faz isso.
           Chamavas onLoginSuccess(data.user) (só o objeto usuário).             --> Passas token, role, user: onLoginSuccess(data.token, data.user.role, data.user).
            URL fixa http://localhost:3001/...                                   -->  Usa ${process.env.REACT_APP_API_URL} para ambiente prod/dev.


Assim o fluxo fica:

AdminLogin envia as credenciais.

Recebe { token, user }.

Chama onLoginSuccess(token, role, user) → que será o login() do AuthContext.

O contexto guarda tudo no localStorage e atualiza o estado global.








import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function AdminLogin({ onLoginSuccess }) { // Adicionamos uma prop para notificar o sucesso do login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) { // Login bem-sucedido (status 2xx)
        setMessage(data.message || 'Login bem-sucedido!');
        // Armazenar o token no localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.user.role); // Opcional: Armazenar a role do usuário
        console.log('Token JWT armazenado:', data.token);

        // Chamar a função de callback se fornecida (para redirecionamento, por exemplo)
        if (onLoginSuccess) {
          onLoginSuccess(data.user); // Passa os dados do usuário logado
        }

      } else { // Erro no login (status 401, 500, etc.)
        setIsError(true);
        setMessage(data.error || 'Erro no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      setIsError(true);
      setMessage('Não foi possível conectar ao servidor de autenticação.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Login de Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail do administrador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '15px', color: isError ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Não tem uma conta de colaborador? <Link to="/admin/register">Registre-se aqui</Link>
      </p>
    </div>
  );
}

export default AdminLogin;   */