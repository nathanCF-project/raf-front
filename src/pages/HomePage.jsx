import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe';
import heroImage from '../assets/hero1.jpg'; 
import '../components/Styles/Custom.css'; 

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Palette, Users, Calendar, BookOpen, ArrowRight, Mail } from "lucide-react"

const HomePage = () => {
  return (
     <> {/* Use um fragmento React */}
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            // ATENÇÃO: Corrija o caminho da imagem. Se 'hero1.jpg' estiver em src/assets, use `url(${heroImage})`
            backgroundImage: `url('${heroImage}')`, // Exemplo: se heroImage estiver em src/assets
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Create. Connect. <span className="text-amber-400">Inspire.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join our vibrant community of artists, creators, and cultural enthusiasts shaping the future of creative
            expression.
          </p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 text-lg">
            Explore Our World
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">About Our Collective</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            We are a dynamic community of artists, educators, and cultural advocates dedicated to fostering creativity,
            preserving cultural heritage, and building bridges between diverse artistic traditions. Our collective
            serves as a catalyst for innovation while honoring the rich tapestry of human expression.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
          >
            Learn More About Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Core Activities Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Our Core Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Palette className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Artistic Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Supporting artists in developing their craft through collaborative projects, studio spaces, and
                  creative residencies.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Training & Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Comprehensive educational programs designed to nurture talent and share knowledge across artistic
                  disciplines.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Building connections between artists and communities through outreach programs and collaborative
                  initiatives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Cultural Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Curating exhibitions, performances, and festivals that celebrate diverse cultural expressions and
                  artistic innovation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Course Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Featured Course</h2>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-600">Contemporary Mixed Media Arts</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Explore the intersection of traditional and digital art forms in this comprehensive 8-week course. Learn
                from renowned artists and develop your unique voice through hands-on projects, critiques, and
                collaborative workshops.
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-gray-600">
                  <strong>Duration:</strong> 8 weeks
                </p>
                <p className="text-gray-600">
                  <strong>Schedule:</strong> Saturdays, 10 AM - 2 PM
                </p>
                <p className="text-gray-600">
                  <strong>Investment:</strong> $450
                </p>
              </div>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Register Now
              </Button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600" // ATENÇÃO: Ajuste este caminho de imagem também
                alt="Mixed Media Arts Course"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSubscribe/>
    </> // Feche o fragmento React aqui
  );
};

export default HomePage;


/*   COMPONENTE DE NEWSLETTER ANTIGO
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-16 w-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Connected</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates on exhibitions, workshops, and community events. Join our newsletter and be part of
              the creative conversation.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white text-gray-900 border-0"
              />
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

*/




















/*  V1 SEM TAILWIND
import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe';
import heroImage from '../assets/hero1.jpg'; 
import '../components/Styles/Custom.css'; 

const HomePage = () => {
  return (
    <div>

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

  <section className="py-5 bg-light text-center">
    <div className="container slide-up delay-1">
      <h2 className="mb-4">Sobre Nós</h2>
      <p className="lead mb-4">
        Fundada por Andreia Galvão e Clara Passarinho em 2025, A Rafeira nasce da urgência de criar, questionar e partilhar. Promovemos a criação artística, a reflexão crítica sobre o setor cultural e a defesa do seu futuro sustentável.
      </p>
      <Link to="/who-we-are" className="btn btn-outline-dark">Conhecer a Estrutura</Link>
    </div>
  </section>

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

export default HomePage;   */




