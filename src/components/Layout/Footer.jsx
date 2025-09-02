// src/components/Layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button"; // Assumindo que você tem esses componentes Shadcn
import { Input } from "../ui/input";
import { Label } from "../ui/label"; // Para o Label do input
import { Textarea } from "../ui/textarea"; // Para a mensagem curta
import { Send } from 'lucide-react'; // Ícone de envio

import logo from '../../assets/logo.png'; // logo

import { useTranslation } from 'react-i18next';


import API_BASE_URL from '../../api/config';

const Footer = () => {


  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };  

const [formData, setFormData] = useState({
    email: '',
    message: '' // Campo para mensagem curta no footer
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    // Para o footer, podemos pré-definir o nome e o assunto,
    // já que não teremos inputs dedicados a eles, mas o backend espera.
    // Ou adaptar o backend para aceitar menos campos para esta rota específica.
    // Por enquanto, vamos enviar o nome como "Contacto do Footer" e um assunto.
    const fullFormData = {
      name: 'Contacto Rápido (Footer)', // Nome fixo
      email: formData.email,
      subject: 'Mensagem Rápida do Footer', // Assunto fixo
      message: formData.message
    };

    // Usar a URL completa que funcionou
    try {

      //PARA TESTES LOCAIS !!!!
     // const response = await fetch('http://localhost:3001/api/contact-form/contact', {
      const response = await fetch(`${API_BASE_URL}/contact-form/contact`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Mensagem enviada! Brevemente entraremos em contacto.');
        setIsSuccess(true);
        setFormData({ email: '', message: '' }); // Limpar o formulário
      } else {
        setStatusMessage(data.error || 'Erro ao enviar a mensagem. Tente novamente.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Erro na requisição do footer:', error);
      setStatusMessage('Não foi possível conectar ao servidor. Verifique sua conexão.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };




  return (
    <footer className="py-12 px-4 bg-black text-white"> {/* Fundo preto igual ao v0.dev */}
      <div className="max-w-6xl mx-auto text-center md:text-left"> {/* Centraliza em mobile, alinha à esquerda em md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Grid para as colunas */}
          {/* Logo e nome */}
          <div className="mb-6 md:mb-0">
            <h5 className="text-2xl font-bold mb-2 text-red-400">A Rafeira</h5> {/* Usando text-amber-400 do v0.dev */}
             <img
              src={logo} // Use a variável importada
              alt="Logo da Associação A Rafeira"
              className="mx-auto md:mx-0 my-4 h-32 w-32 object-contain" // Ajuste as classes para o tamanho e centralização desejados
            />
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>

             {/* BOTÕES DE IDIOMA AQUI */}
                        <div className="mt-4 flex justify-center md:justify-start space-x-2">
                          <Button
                            variant="ghost"
                            className={`p-2 rounded-full text-white ${i18n.language === 'pt' ? 'bg-gray-700' : ''}`}
                            onClick={() => changeLanguage('pt')}
                          >
                            PT
                          </Button>
                          <Button
                            variant="ghost"
                            className={`p-2 rounded-full text-white ${i18n.language === 'en' ? 'bg-gray-700' : ''}`}
                            onClick={() => changeLanguage('en')}
                          >
                            EN
                          </Button>
                        </div>
                        
          </div>

          {/* Links rápidos */}
          <div className="mb-6 md:mb-0">
            <h6 className="text-xl font-bold uppercase mb-4 text-gray-200">  {t("footer.links")}</h6>
            <ul className="list-none p-0 space-y-2"> {/* space-y-2 para espaçamento entre links */}
              <li><Link to="/who-we-are" className="text-gray-400 hover:text-red-400 transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-red-400 transition-colors">{t("footer.contacts")}</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-red-400 transition-colors">{t("footer.privacyPolicy")}</Link></li> {/* Mude para Link se for rota */}
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-red-400 transition-colors">{t("footer.termsOfService")}</Link></li> {/* Mude para Link se for rota */}
            </ul>
          </div>

           {/* Contato e Mini Formulário */}
          <div>
            <h6 className="text-xl font-bold uppercase mb-4 text-gray-200">{t("footer.quickContact")}</h6>
            <p className="text-gray-400 text-sm mb-2">Email: <a href="mailto:arafeira.estruturadecriacao@gmail.com" className="hover:underline">arafeira.estruturadecriacao@gmail.com</a></p>
            <p className="text-gray-400 text-sm mb-2">Instagram: <a href="https://www.instagram.com/arafeira.estruturadecriacao/" target="_blank" rel="noopener noreferrer" className="hover:underline">@arafeira.estruturadecriacao</a></p>
            <p className="text-gray-400 text-sm mb-4">Telefones: <a href="tel:+351962185565" className="hover:underline">+351 962 185 565</a> / <a href="tel:+351961200611" className="hover:underline">+351 961 200 611</a></p>

            {/* Mini Formulário de Contacto */}
            <h6 className="text-lg font-bold uppercase mb-3 text-gray-200">{t("footer.quickMessage")}</h6>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                id="email"
                type="email"
                placeholder={t("footer.placeholders.email")}
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                id="message"
                placeholder={t("footer.placeholders.message")}
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400 min-h-[60px] max-h-[120px] resize-y"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {statusMessage && (
                <div className={`mt-2 p-2 rounded-md text-xs ${isSuccess ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {statusMessage}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-slate-900 py-2 text-base font-medium transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'A Enviar...' : <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </>}
              </Button>
            </form>
          </div>
        </div>

        {/* Direitos autorais no rodapé, como o v0.dev */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} Associação Rafeira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



/*
V1 SEM TAILWIND/SHADCN

//componentes/Layout/Footer.jsx  

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-2">Associação Rafeira</h5>
            <p className="small text-muted">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase">Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-decoration-none text-light small">Sobre Nós</a></li>
              <li><a href="/contact" className="text-decoration-none text-light small">Contactos</a></li>
              <li><a href="#privacy-policy" className="text-decoration-none text-light small">Política de Privacidade</a></li>
              <li><a href="#terms-of-service" className="text-decoration-none text-light small">Termos de Serviço</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="text-uppercase">Contacto</h6>
            <p className="small mb-1">Email: arafeira.estruturadecriacao@gmail.com</p>
            <p className="small mb-1">Instagram: @arafeira.estruturadecriacao</p>
            <p className="small mb-1">E-mail das co-diretoras artísticas: clara.passarinho@gmail.com / andreiabaptistagalvao@gmail.com  </p>
            <p className="small">Telefones: +351 962 185 565 / +351 961 200 611</p>
            <p className="small">Formulário de contacto direto (nome, e-mail, mensagem)</p>



          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

*/