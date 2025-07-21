//componentes/Layout/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          {/* Logo e nome */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-2">Associação Rafeira</h5>
            <p className="small text-muted">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>

          {/* Links rápidos */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase">Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-decoration-none text-light small">Sobre Nós</a></li>
              <li><a href="/contact" className="text-decoration-none text-light small">Contactos</a></li>
              <li><a href="#privacy-policy" className="text-decoration-none text-light small">Política de Privacidade</a></li>
              <li><a href="#terms-of-service" className="text-decoration-none text-light small">Termos de Serviço</a></li>
            </ul>
          </div>

          {/* Contato */}
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



/*

import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#222',
    color: '#bbb',
    padding: '20px 30px',
    textAlign: 'center',
    marginTop: 'auto', // Empurra o footer para o final da página se o App tiver flex-direction: column
    boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
    width: '100%',
    boxSizing: 'border-box'
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    margin: '0 10px',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Associação Rafeira. Todos os direitos reservados.</p>
      <div>
        <a href="#privacy-policy" style={linkStyle}>Política de Privacidade</a>
        <a href="#terms-of-service" style={linkStyle}>Termos de Serviço</a>
      </div>
      <p style={{ marginTop: '10px', fontSize: '0.9em' }}>Contacto: exemplo@associacaorafeira.org</p>
    </footer>
  );
}

export default Footer;

*/