import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState(''); // estado para o código de acesso
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', { //  rota de registro
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, accessCode }), // Envia o código de acesso
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Registro bem-sucedido! Redirecionando para o login...');
        // tentar depois( Armazenar o token se quiser logar automaticamente após o registro )
        // localStorage.setItem('authToken', data.token);
        // localStorage.setItem('userRole', data.user.role);
        // console.log('Token JWT armazenado:', data.token);

        setTimeout(() => {
          navigate('/admin/login'); // Redireciona para a página de login após o registro
        }, 2000); // Espera 2 segundos antes de redirecionar
      } else {
        setIsError(true);
        setMessage(data.error || 'Erro no registro. Verifique as informações e o código de acesso.');
      }
    } catch (error) {
      console.error('Erro na requisição de registro:', error);
      setIsError(true);
      setMessage('Não foi possível conectar ao servidor de registro.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Registro de Colaborador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
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
          style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="text" // Campo para o código de acesso
          placeholder="Código de Acesso"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          required
          style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Registrar
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '15px', color: isError ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Já tem uma conta? <Link to="/admin/login">Faça Login</Link>
      </p>
    </div>
  );
}

export default AdminRegister;