import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe';
import heroImage from '../assets/hero1.jpg'; 
import '../components/Styles/Custom.css'; 

const HomePage = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-dark text-light text-center py-5" style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold">A Rafeira – Estrutura de Criação</h1>
          <p className="lead">Criar. Pensar. Agir. Democratizar o acesso à cultura.</p>
          <Link to="/about" className="btn btn-warning btn-lg mt-3">Saber mais</Link>
        </div>
      </section>

        {/* SOBRE A RAFFEIRA */}
  <section className="py-5 bg-light text-center">
    <div className="container slide-up delay-1">
      <h2 className="mb-4">Sobre Nós</h2>
      <p className="lead mb-4">
        Fundada por Andreia Galvão e Clara Passarinho em 2025, A Rafeira nasce da urgência de criar, questionar e partilhar. Promovemos a criação artística, a reflexão crítica sobre o setor cultural e a defesa do seu futuro sustentável.
      </p>
      <Link to="/who-we-are" className="btn btn-outline-dark">Conhecer a Estrutura</Link>
    </div>
  </section>

  {/* EIXOS DE AÇÃO */}
  <section className="py-5 text-center">
    <div className="container fade-in delay-2">
      <h2 className="mb-5">O que fazemos</h2>
      <div className="row g-4">
        {[
          { title: 'Criação Artística', path: '/what-we-do/artistic-creation' },
          { title: 'Formação', path: '/what-we-do/training' },
          { title: 'Intercâmbios Culturais', path: '/what-we-do/cultural-exchanges' },
          { title: 'Defesa da Cultura', path: '/what-we-do/culture-defense' }
        ].map((item, i) => (
          <div className="col-md-6 col-lg-3" key={i}>
            <Link to={item.path} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm slide-up delay-3">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Saber mais</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>

      {/* DESTAQUES OU EVENTOS ATUAIS */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Em Destaque</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h5>Curso: Rakugo – A Arte Japonesa de Contar Histórias</h5>
              <p className="small">
                Curso online com Clara Passarinho. 5 sessões, de maio a outubro. Técnicas narrativas, práticas e performance final.
              </p>
              <a href="https://www.bol.pt/Comprar/Bilhetes/159761-rakugo_a_arte_japonesa_de_contar_historias_curso-museu_do_oriente/" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                Inscreva-se aqui
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="mb-3">Receba as novidades da Rafeira</h2>
          <p className="text-muted">Inscreva-se na nossa newsletter para não perder projetos, formações e ações culturais.</p>
          <NewsletterSubscribe />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
