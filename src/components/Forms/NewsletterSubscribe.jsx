
// src/components/Forms/NewsletterSubscribe.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Importe Button do shadcn/ui
import { Input } from '@/components/ui/input';   // Importe Input do shadcn/ui
import { Mail } from 'lucide-react'; // Ícone para o título, se quiser
import { useTranslation } from 'react-i18next';


import API_BASE_URL from '../../api/config';

function NewsletterSubscribe() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      // ATENÇÃO: Verifique o URL do seu backend.
      // Se você está rodando localmente, 'http://localhost:3001/api/newsletter/subscribe' está ok.
      // Para produção, isso precisará ser alterado para o URL do seu servidor real.

      //PARA TESTES LOCAIS!!!
      //const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || t("newsletter.success"));
        setEmail('');
      } else {
        setIsError(true);
        setMessage(data.error || t("newsletter.error"));
      }
    } catch (error) {
      console.error('Erro na requisição de inscrição:', error);
      setIsError(true);
      setMessage(t("newsletter.networkError"));
    }
  };

  return (
    <section className="py-12 px-4 bg-red-400 text-black"> {/* Fundo escuro igual ao v0.dev */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Mail className="h-16 w-16 text-black mx-auto mb-6" /> {/* Ícone */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("newsletter.title")}</h2>
          
        </div>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-black border-0 focus:ring-black focus:border-black" // Estilo Shadcn/Tailwind
            />
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-semibold px-8" // Estilo Shadcn/Tailwind
            >
              {t("newsletter.button")}
            </Button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${isError ? 'text-black' : 'text-green-400'} font-bold`}>
              {message}
            </p>
          )}
          <p className="text-sm text-black mt-4">
             {t("newsletter.privacy")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSubscribe;




/*
<p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Receba as últimas atualizações sobre exposições, workshops e eventos da comunidade.
            Junte-se à nossa newsletter e faça parte da conversa criativa.
          </p>

*/




/*

V1.2 SEM TAILWIND/SHADCN

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

*/