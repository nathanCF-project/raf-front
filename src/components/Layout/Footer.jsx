// src/components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link se os links forem para rotas internas

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-black text-white"> {/* Fundo preto igual ao v0.dev */}
      <div className="max-w-6xl mx-auto text-center md:text-left"> {/* Centraliza em mobile, alinha à esquerda em md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Grid para as colunas */}
          {/* Logo e nome */}
          <div className="mb-6 md:mb-0">
            <h5 className="text-2xl font-bold mb-2 text-amber-400">A Rafeira - Estrutura de criação</h5> {/* Usando text-amber-400 do v0.dev */}
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>

          {/* Links rápidos */}
          <div className="mb-6 md:mb-0">
            <h6 className="text-xl font-bold uppercase mb-4 text-gray-200">Links</h6>
            <ul className="list-none p-0 space-y-2"> {/* space-y-2 para espaçamento entre links */}
              <li><Link to="/who-we-are" className="text-gray-400 hover:text-amber-400 transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">Contactos</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-amber-400 transition-colors">Política de Privacidade</Link></li> {/* Mude para Link se for rota */}
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-amber-400 transition-colors">Termos de Serviço</Link></li> {/* Mude para Link se for rota */}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h6 className="text-xl font-bold uppercase mb-4 text-gray-200">Contacto</h6>
            <p className="text-gray-400 text-sm mb-2">Email: arafeira.estruturadecriacao@gmail.com</p>
            <p className="text-gray-400 text-sm mb-2">Instagram: @arafeira.estruturadecriacao</p>
            <p className="text-gray-400 text-sm mb-2">Telefones: +351 962 185 565 / +351 961 200 611</p>
            <p className="text-gray-400 text-sm">Formulário de contacto direto (nome, e-mail, mensagem) em progresso..</p>
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