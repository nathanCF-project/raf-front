
import React, { useState } from 'react';

function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    setMessage(''); // Limpa mensagens anteriores
    setIsError(false); // Reseta o estado de erro

    try {
      const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) { // Status 2xx (ex: 201 Created)
        setMessage(data.message || 'Inscrição realizada com sucesso!');
        setEmail(''); // Limpa o campo de email
      } else { // Status de erro (ex: 400, 409, 500)
        setIsError(true);
        setMessage(data.error || 'Erro ao processar sua inscrição. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição de inscrição:', error);
      setIsError(true);
      setMessage('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Inscreva-se na Nossa Newsletter!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Inscrever
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '15px', color: isError ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        Seu email será usado apenas para o envio da newsletter.
      </p>
    </div>
  );
}

export default NewsletterSubscribe;