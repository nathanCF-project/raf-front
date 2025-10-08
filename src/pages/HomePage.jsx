import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe';
import heroImage from '/images/Hotel-Chronos3.jpg?url'; 
import heroImage2 from '/images/clarahd.png'; 
import HeroCarousel from './HeroCarousel'; 

import { useTranslation } from 'react-i18next'; 



//import '../components/Styles/Custom.css'; 

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input"; // Pode ser removido se a Newsletter for o único lugar que usa Input
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Palette, Users, Calendar, BookOpen, ArrowRight, Mail } from "lucide-react";

const acoes = [
  {
    key: 'actions.creation',
    icon: Palette,
    link: '/what-we-do/artistic-creation',
  },
  {
    key: 'actions.training',
    icon: BookOpen,
    link: '/what-we-do/training',
  },
  {
    key: 'actions.exchanges',
    icon: Users,
    link: 'what-we-do/cultural-exchanges',
  },
  {
    key: 'actions.defense',
    icon: Calendar,
    link: '/what-we-do/culture-defense',
  },
  {
    key: 'actions.publication', // <--- Chave para o 5º item
    icon: Mail,
    link: '/what-we-do/translation',
  },
  
];


const HomePage = () => {

    const { t } = useTranslation();
    

  return (
    <> {/* Fragmento React para englobar todo o conteúdo */}
      {/* Hero Section com o novo Carrossel */}
      <HeroCarousel>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-amatic uppercase font-bold mb-6 leading-tight text-red-500 drop-shadow-lg">
            <span className="block text-6xl md:text-8xl">A Rafeira</span>
            <span className="block text-2xl md:text-4xl mt-2">Estrutura de Criação</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            <br />
          </p>
          <Link to="/who-we-are">
            <Button size="lg" className="bg-rafeira-red hover:bg-red-600 text-white font-semibold px-8 py-3 text-lg">
               {t('home.heroButton')}
            </Button>
          </Link>
        </div>
      </HeroCarousel>

      {/* Sobre Nós Section (adaptada) */}
          <section
        className="relative flex items-center justify-center text-center min-h-[90vh] md:min-h-[100vh] px-6 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/Hotel-Chronos3.jpg')", // troque por outra se quiser
        }}
      >
        {/* Overlay em degradê vermelho-translúcido para legibilidade e estilo */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/65 via-red-800/20 to-black/70"></div>

        {/* Conteúdo principal */}
        <div className="relative z-10 max-w-4xl mx-auto text-white drop-shadow-lg">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-wide">
            {t('home.aboutTitle')}
          </h2>
          <p className="text-lg md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto text-gray-100">
            {t('home.aboutText')}
          </p>

          <Link to="/who-we-are">
            <Button
              size="lg"
              className="bg-red-600/90 hover:bg-red-700 text-white font-semibold px-10 py-4 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {t('home.aboutButton')}
              <ArrowRight className="ml-3 h-6 w-6 inline-block" />
            </Button>
          </Link>
        </div>

        {/* Sutil overlay adicional no rodapé para blend mais suave com próxima seção */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </section>

          {/* O que fazemos Section (com degrade vermelho elegante) */}
    <section className="relative py-28 px-6 bg-gradient-to-b from-red-50 via-white to-red-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 text-gray-900 tracking-tight">
          {t('home.whatWeDoTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 justify-items-center">
          {acoes.map((item) => (
            <Link
              key={item.key}
              to={item.link}
              className="w-full max-w-sm no-underline group"
            >
              <Card className="text-center border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden flex flex-col justify-between h-full">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-10 w-10 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
                    {t(`home.${item.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 leading-relaxed mb-6">
                    {t(`home.${item.key}.description`)}
                  </CardDescription>
                  <p className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                    {t('home.knowMore')} <ArrowRight className="inline-block ml-1 h-4 w-4" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay decorativo no rodapé da seção */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-red-200/60 to-transparent pointer-events-none"></div>
    </section>

      {/* Em Destaque (Featured Course) Section (adaptada) */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('home.featuredTitle')}</h2>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-red-600">{t('home.featuredCourseTitle')}</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {t('home.featuredCourseDescription')}
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-gray-600">
                  <strong>{t('home.featuredCourseDuration')}</strong> {t('home.featuredCourseSessions')}
                </p>
                <p className="text-gray-600">
                  <strong>{t('home.featuredCourseSchedule')}</strong> {t('home.featuredCourseMonths')}
                </p>
                {/* Removido o campo "Investment" pois não estava no conteúdo original */}
              </div>
              <a href="https://www.bol.pt/Comprar/Bilhetes/159761-rakugo_a_arte_japonesa_de_contar_historias_curso-museu_do_oriente/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-black font-semibold">
                   {t('home.featuredCourseButton')}
                </Button>
              </a>
            </div>
            <div className="relative">
              <img
                src={heroImage2} // Usando a mesma heroImage como placeholder, ou substitua por uma imagem específica do curso
                alt="Curso Rakugo - A Arte Japonesa de Contar Histórias"
                className="rounded-lg shadow-xl w-full h-auto object-cover" // object-cover para garantir que a imagem preencha o espaço sem distorcer
                style={{ maxHeight: '400px' }} // Altura máxima para a imagem do curso
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section (importada do seu componente) */}
      <NewsletterSubscribe />
    </>
  );
};

export default HomePage;


/*  

import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/Forms/NewsletterSubscribe';
import heroImage from '/images/Hotel-Chronos3.jpg?url'; 
import heroImage2 from '/images/japones.jpg'; 

//import '../components/Styles/Custom.css'; 

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input"; // Pode ser removido se a Newsletter for o único lugar que usa Input
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Palette, Users, Calendar, BookOpen, ArrowRight, Mail } from "lucide-react";

const acoes = [
  {
    title: 'Criação Artística',
    icon: Palette,
    description: 'Apoio a artistas no desenvolvimento de sua arte através de projetos colaborativos, espaços de estúdio e residências criativas.',
    link: '/what-we-do/artistic-creation',
  },
  {
    title: 'Formação',
    icon: BookOpen,
    description: 'Programas educacionais abrangentes para nutrir talentos e compartilhar conhecimento em diversas disciplinas artísticas.',
    link: '/what-we-do/training',
  },
  {
    title: 'Intercâmbios Culturais',
    icon: Users,
    description: 'Construindo pontes entre artistas e comunidades através de programas de extensão e iniciativas colaborativas.',
    link: 'what-we-do/cultural-exchanges',
  },
  {
    title: 'Defesa da Cultura',
    icon: Calendar,
    description: 'Curadoria de exposições, performances e festivais que celebram diversas expressões culturais e inovação artística.',
    link: '/what-we-do/culture-defense',
  },
];


const HomePage = () => {
  return (
    <> 
      
      <section className="relative h-screen flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }} // Usa sua imagem hero
        />
        <div className="absolute inset-0 bg-black/70" /> 
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A Rafeira <br /> Estrutura de Criação
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"> 
            <br />
          </p>
          <Link to="/who-we-are">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-black font-semibold px-8 py-3 text-lg">
              Saber mais
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Sobre Nós</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            Fundada por Andreia Galvão e Clara Passarinho em 2025, A Rafeira nasce da urgência de criar, questionar e partilhar. Promovemos a criação artística, a reflexão crítica sobre o setor cultural e a defesa do seu futuro sustentável.
          </p>
          <Link to="/who-we-are">
            <Button
              variant="outline"
              size="lg"
              className="border-amber-500 text-red-600 hover:bg-amber-50 bg-transparent"
            >
              Conhecer a Estrutura
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

       <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">O que fazemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {acoes.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="no-underline text-gray-900 hover:text-red-600"
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                  <p className="mt-4 text-red-600 font-semibold">
                    Saber mais <ArrowRight className="inline-block ml-1 h-4 w-4" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>

      <section className="py-20 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Em Destaque</h2>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-red-600">Curso: Rakugo – A Arte Japonesa de Contar Histórias</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Curso online com Clara Passarinho. 5 sessões, de maio a outubro. Técnicas narrativas, práticas e performance final.
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-gray-600">
                  <strong>Duração:</strong> 5 sessões
                </p>
                <p className="text-gray-600">
                  <strong>Horário:</strong> Maio a Outubro
                </p>
              </div>
              <a href="https://www.bol.pt/Comprar/Bilhetes/159761-rakugo_a_arte_japonesa_de_contar_historias_curso-museu_do_oriente/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-black font-semibold">
                  Inscreva-se aqui
                </Button>
              </a>
            </div>
            <div className="relative">
              <img
                src={heroImage2} // Usando a mesma heroImage como placeholder, ou substitua por uma imagem específica do curso
                alt="Curso Rakugo - A Arte Japonesa de Contar Histórias"
                className="rounded-lg shadow-xl w-full h-auto object-cover" // object-cover para garantir que a imagem preencha o espaço sem distorcer
                style={{ maxHeight: '400px' }} // Altura máxima para a imagem do curso
              />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSubscribe />
    </>
  );
};

export default HomePage;

*/




