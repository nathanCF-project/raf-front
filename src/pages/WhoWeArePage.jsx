// src/pages/WhatWeDo/ArtisticCreationPage.jsx
// my-react-app/src/pages/AboutUs.jsx (ou onde quer que você queira colocar este componente)

import React from 'react'; // Importar React é uma boa prática
import { Mail } from "lucide-react"; // Para o ícone de e-mail

// É importante que o componente Image seja do 'react' para aplicações SPA (Single Page Application)
// Se você está usando Next.js, 'next/image' é o correto.
// Como estamos em um projeto React padrão, usaremos um <img> tag simples por enquanto,
// ou uma biblioteca de imagem otimizada para React se for necessário.
// Para este exemplo, usaremos <img> e você pode substituir as `src` pelas suas imagens.

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6">A Rafeira</h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Estrutura de Criação artística dedicada a promover a criação artística, a reflexão sobre o setor e a sua sustentabilidade,
            o intercâmbio cultural e a democracia no acesso à fruição cultural.
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">A Nossa História</h2>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              A Rafeira - Estrutura de Criação nasce de uma visão partilhada e do compromisso de duas profissionais dinâmicas,
              envolvidas e militantes no setor da cultural. Fundada e co-dirigida por Andreia Galvão e Clara Passarinho em 2025,
              a Rafeira surge no ambiente contemporâneo cultural português com o objetivo de promover a criação artística,
              a reflexão sobre o setor e a sua sustentabilidade, o intercâmbio cultural e a democracia no acesso à fruição cultural.
              Ambas já vinham desenvolvendo projetos em conjunto desde 2023.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              A estrutura assenta em quatro pilares fundamentais, que refletem o compromisso da Rafeira com um ecossistema cultural
              mais inclusivo, sustentável e participativo, promovendo práticas que envolvem diretamente artistas, públicos e comunidades.
            </p>
          </div>
        </div>
      </section>

      {/* Key Pillars Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center">Os Nossos Pilares</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Criação Artística - você pode substituir por um ícone de sua biblioteca de ícones ou SVG */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Criação Artística</h3>
              <p className="text-gray-600 leading-relaxed">
                Fomentar a expressão artística inovadora através de projetos colaborativos que transcendem limites criativos
                e exploram novos meios.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Formação */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Formação</h3>
              <p className="text-gray-600 leading-relaxed">
                Proporcionar programas educativos e workshops abrangentes que desenvolvam competências artísticas e nutram
                talentos emergentes.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Intercâmbios Culturais */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Intercâmbios Culturais</h3>
              <p className="text-gray-600 leading-relaxed">
                Construir pontes entre diversas comunidades artísticas e facilitar um diálogo e colaboração cultural significativos.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                {/* Ícone ou imagem para Defesa da Cultura */}
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.928 12c0 3.072 1.144 5.861 3.018 8.019M12 21.036V12"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Defesa da Cultura</h3>
              <p className="text-gray-600 leading-relaxed">
                Preservar e proteger o património cultural, defendendo o papel vital das artes na sociedade e no desenvolvimento comunitário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-founders Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center">As Co-Fundadoras</h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Clara Passarinho */}
            <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
              <div className="flex flex-col items-center text-center mb-8">
                {/* Caminho da imagem para Clara Passarinho */}
                <img
                  src="images/clara.jpg" // SUGESTÃO: Coloque a imagem da Clara aqui (ex: public/images/clara_passarinho.jpg)
                  alt="Clara Passarinho"
                  width={200}
                  height={200}
                  className="rounded-full mb-6 object-cover aspect-square w-48 h-48" // Definindo tamanho explícito e aspect ratio
                />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Clara Passarinho</h3>
                <p className="text-gray-500 mb-4"></p> {/* Informação da data de nascimento */}
                <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:clara@arafeira.com" className="text-sm">
                    clara.passarinho@gmail.com
                  </a>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Artista portuguesa com licenciatura em Teatro – ramo de Atores – pela Escola Superior de Teatro e Cinema,
                  e mestre em Encenação pela mesma instituição. Dirigiu a peça Nevou no País das Maravilhas, onde também
                  foi responsável pela dramaturgia. Em 2023, venceu o concurso para jovens encenadores promovido pelo Baal17,
                  onde dirigiu a criação Estrangeiras, baseada num texto de José Luís Peixoto. Além da encenação, Clara
                  co-criou e foi intérprete no espetáculo Hotel Chronos, que esteve em residência artística no Largo
                  Residências, em Lisboa, no fim de 2024. Fez parte do elenco de À Flor das Águas, Caim e Barbo, Salvar Gaia
                  Rumo a Yod com o Teatro Estúdio Fontenova.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Em 2024, colaborou com o Yokohama Theatre Group e realizou uma pesquisa sobre Rakugo em Tóquio, com o apoio
                  da Fundação Oriente. Além disso, é membro do Culture Action Europe, uma rede europeia dedicada ao setor
                  cultural e criativo. Clara tem estado envolvida em vários projetos europeus, tendo escrito e participado
                  em mais de 10 programas de mobilidade. É co-fundadora da Associação da Minha Rua, uma associação juvenil
                  baseada em Caldas da Rainha. Fez assistência de produção no Festival Alecrim, um evento sobre ecologia e
                  cultura organizado em parceria com a Casa do Jardim da Estrela (Um teatro em cada bairro) e apoiado pelo
                  Instituto Marquês Valle Flor.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  No ano seguinte, 2025, co-coordenou o projeto A Cidade que Queremos, financiado pela Fundação AMI, com o
                  objetivo de levar uma performance/conferência às escolas da Amadora para jovens e crianças sobre cidades
                  sustentáveis e realizar um festival de 3 dias na Cova da Moura com artistas locais e workshops. Foi convidada
                  para encenar a nova criação do Núcleo de Teatro da Faculdade de Ciências e Tecnologias da Universidade NOVA.
                  O espetáculo participou na competição do FATAL 2025 e recebeu o Prémio Cidade de Lisboa na categoria de espetáculo
                  mais inovador. Paralelamente, concluiu a pós-graduação em Performance e Tecnologia Digital no Instituto de Teatro
                  de Barcelona. Clara, em conjunto com Andreia Galvão, criou a estrutura de criação A Rafeira com o objetivo
                  de promover a criação artística, a reflexão sobre o setor e a sua sustentabilidade, o intercâmbio cultural
                  e a democracia no acesso à fruição cultural.
                </p>
              </div>
            </div>

            {/* Andreia Galvão */}
            <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
              <div className="flex flex-col items-center text-center mb-8">
                {/* Caminho da imagem para Andreia Galvão */}
                <img
                  src="images/Andreia.jpg" // SUGESTÃO: Coloque a imagem da Andreia aqui (ex: public/images/andreia_galvao.jpg)
                  alt="Andreia Galvão"
                  width={200}
                  height={200}
                  className="rounded-full mb-6 object-cover aspect-square w-48 h-48" // Definindo tamanho explícito e aspect ratio
                />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Andreia Galvão</h3>
                <p className="text-gray-500 mb-4"></p> {/* Informação da data de nascimento */}
                <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:andreia@arafeira.com" className="text-sm">
                    andreiabaptistagalvao@gmail.com
                  </a>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  É licenciada em Ciências da Comunicação, com especialização em Cinema e Televisão pela Universidade NOVA
                  de Lisboa, e mestre com distinção em Teatro – Artes Performativas pela Escola Superior de Teatro e Cinema.
                  Fez Erasmus+ na Sorbonne Nouvelle (Paris 3) e completou formações adicionais na escola internacional de
                  teatro Jacques Lecoq (Paris), bem como em técnicas como máscara neutra, Commedia dell’Arte e “Spoken English
                  for Acting” na Royal Academy of Dramatic Art (RADA), em Londres. Frequentou ainda o curso de práticas de
                  encenação no Teatro Meridional.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Trabalha como atriz, criadora e formadora. Estreou-se como co-criadora no espetáculo Hotel Chronos, que
                  também co-escreveu. O texto dramatúrgico do espetáculo foi selecionado para o Ciclo de Novas Dramaturgias
                  Portuguesas da companhia O Fim do Teatro, em parceria com a Reitoria da Universidade de Lisboa.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  É co-fundadora de “A Rafeira” — uma estrutura de criação que organiza cursos e oficinas facilitados por si,
                  direcionados a públicos adultos. O seu trabalho desenvolve-se na interseção entre criação artística e
                  participação pública, com foco na capacitação crítica de cidadãos através das artes. Utiliza metodologias
                  como teatro físico, escrita criativa, improvisação e pensamento coletivo, promovendo contextos de aprendizagem
                  transformadores. Paralelamente, trabalha como jornalista freelancer. Colaborou com publicações como a revista
                  Ítaca (do Teatro Nacional D. Maria II) e foi bolseira da Ciência Viva e da revista Gerador, com uma
                  reportagem sobre teatro político. Em 2024, organizou o seu primeiro festival dedicado à ecologia e cultura,
                  na Casa do Jardim da Estrela, em Lisboa, com o coletivo “Alecrim”, também fundado por si. Em 2025,
                  organizou o seu segundo festival — A Cidade que Queremos — que decorreu entre a Cova da Moura e o Teatro de
                  Alfornelos, juntando moradores, artistas e pensadores em torno de ideias para imaginar, construir e disputar
                  coletivamente o espaço urbano. O festival reafirma a sua visão de um trabalho artístico profundamente
                  comprometido com a transformação social.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-4">A Rafeira</h3>
          <p className="text-gray-600">Estrutura de Criação Artística</p>
        </div>
      </footer>
    </div>
  );
}
