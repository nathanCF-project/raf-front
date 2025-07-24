
// src/components/Auth/AdminLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate
import { useAuth } from "./AuthContext"; // Importe useAuth

// Componentes Shadcn UI
import { Button } from '@/components/ui/button'; // Use alias aqui
import { Input } from '@/components/ui/input';   // Use alias aqui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Use alias aqui

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate(); // Inicialize useNavigate
  const { login } = useAuth(); // Obtenha a função login do AuthContext

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

      // Chama a função login do AuthContext
      login(data.token, data.user.role, data.user);
      setMessage("Login bem-sucedido!");
      navigate('/admin/dashboard'); // Redireciona após o login bem-sucedido

    } catch (err) {
      console.error("Erro de rede:", err);
      setIsError(true);
      setMessage("Não foi possível contactar o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px-96px)] bg-gray-100 p-4"> {/* Ajusta para ocupar o espaço entre header e footer */}
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white"> {/* Card do Shadcn UI */}
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Login de Administrador</CardTitle>
          <p className="text-gray-600">Acesse sua conta de colaborador.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Espaçamento entre os elementos do formulário */}
            <Input
              type="email"
              placeholder="E-mail do administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500" // Estilo Shadcn/Tailwind
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500" // Estilo Shadcn/Tailwind
            />
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-md" // Estilo Shadcn/Tailwind
            >
              Entrar
            </Button>
          </form>

          {message && (
            <p className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'} font-semibold`}>
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta de colaborador?{" "}
            <Link to="/admin/register" className="text-amber-600 hover:underline">
              Registre-se aqui
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminLogin;






/*  antes da reformulacao do tailwind e uso do useauth e usenavigate

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

 */