// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";

export default function WhoWeArePage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Quem Somos</h1>
        <p className="lead text-muted">Conheça a equipe fundadora da Associação A Rafeira</p>
      </div>

      <div className="row g-5 justify-content-center">
        {/* Diretora 1 */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <img src="src/assets/Andreia.jpg" alt="Diretora 1" className="card-img-top img-fluid" />
            <div className="card-body">
              <h5 className="card-title">Clara Alexandra Mouzinho Passarinho</h5>
              <p className="card-text">
                 Nascida em 29/04/2001.

                <br /><br />

                Artista portuguesa com licenciatura em Teatro – ramo de Atores – pela Escola Superior de Teatro e Cinema, e mestre em Encenação pela mesma instituição. Dirigiu a peça Nevou no País das Maravilhas, onde também foi responsável pela dramaturgia.
                 Em 2023, venceu o concurso para jovens encenadores promovido pelo Baal17, onde dirigiu a criação Estrangeiras, baseada num texto de José Luís Peixoto. 
                 <br /><br />Além da encenação, Clara co-criou e foi intérprete no espetáculo Hotel Chronos, 
                 que esteve em residência artística no Largo Residências, em Lisboa, no fim de 2024. Fez parte do elenco de À Flor das Águas, Caim e Barbo, Salvar Gaia Rumo a Yod com o Teatro Estúdio Fontenova.

                Em 2024, colaborou com o Yokohama Theatre Group e realizou uma pesquisa sobre Rakugo em Tóquio, com o apoio da Fundação Oriente. 
                <br /><br />Além disso, é membro do Culture Action Europe, uma rede europeia dedicada ao setor cultural e criativo. 
                Clara tem estado envolvida em vários projetos europeus, tendo escrito e participado em mais de 10 programas de mobilidade. É co-fundadora da Associação da Minha Rua, uma associação juvenil baseada em Caldas da Rainha. 
                Fez assistência de produção no Festival Alecrim, um evento sobre ecologia e cultura organizado em parceria com a Casa do Jardim da Estrela (Um teatro em cada bairro) e apoiado pelo Instituto Marquês Valle Flor.  
                <br /><br />No ano seguinte, 2025, co-coordenou o projeto A Cidade que Queremos, financiado pela Fundação AMI, com o objetivo de levar uma performance/conferência às escolas da Amadora para jovens e crianças sobre cidades sustentáveis e realizar um festival de 3 dias na Cova da Moura com artistas locais e workshops.
                 Foi convidada para encenar a nova criação do Núcleo de Teatro da Faculdade de Ciências e Tecnologias da Universidade NOVA. 
                 <br /><br />O espetáculo participou na competição do FATAL 2025 e recebeu o Prémio Cidade de Lisboa na categoria de espetáculo mais inovador. 
                 Paralelamente, concluiu a pós-graduação em Performance e Tecnologia Digital no Instituto de Teatro de Barcelona. Clara, em conjunto com Andreia Galvão, criou a estrutura de criação A Rafeira com o objetivo de promover a criação artística, a reflexão sobre o setor e a sua sustentabilidade,
                  o intercâmbio cultural e a democracia no acesso à fruição cultural.

              </p>
            </div>
          </div>
        </div>

        {/* Diretora 2 */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <img src="src/assets/Andreia.jpg" alt="Diretora 2" className="card-img-top img-fluid" />
            <div className="card-body">
              <h5 className="card-title">Andreia Galvão </h5>
              <p className="card-text">
                 Nascida em /.
          <br />  <br />
                É licenciada em Ciências da Comunicação, com especialização em Cinema e Televisão pela Universidade NOVA de Lisboa, e mestre com distinção em Teatro – Artes Performativas pela Escola Superior de Teatro e Cinema. 
                Fez Erasmus+ na Sorbonne Nouvelle (Paris 3) e completou formações adicionais na escola internacional de teatro Jacques Lecoq (Paris), bem como em técnicas como máscara neutra, 
                Commedia dell’Arte e “Spoken English for Acting” na Royal Academy of Dramatic Art (RADA), em Londres. <br /><br />
                Frequentou ainda o curso de práticas de encenação no Teatro Meridional.
                Trabalha como atriz, criadora e formadora. Estreou-se como co-criadora no espetáculo Hotel Chronos, que também co-escreveu. O texto dramatúrgico do espetáculo foi selecionado para o Ciclo de Novas Dramaturgias Portuguesas da companhia O Fim do Teatro, 
                em parceria com a Reitoria da Universidade de Lisboa.
                É co-fundadora de “A Rafeira” — uma estrutura de criação que organiza cursos e oficinas facilitados por si, direcionados a públicos adultos. 
                <br /><br />O seu trabalho desenvolve-se na interseção entre criação artística e participação pública, 
                com foco na capacitação crítica de cidadãos através das artes. Utiliza metodologias como teatro físico, escrita criativa, improvisação e pensamento coletivo, promovendo contextos de aprendizagem transformadores.
                Paralelamente, trabalha como jornalista freelancer. Colaborou com publicações como a revista Ítaca (do Teatro Nacional D. Maria II) e foi bolseira da Ciência Viva e da revista Gerador, com uma reportagem sobre teatro político.
                Em 2024, organizou o seu primeiro festival dedicado à ecologia e cultura, na Casa do Jardim da Estrela, em Lisboa, com o coletivo “Alecrim”, também fundado por si.
                 <br /><br />Em 2025, organizou o seu segundo festival — A Cidade que Queremos — que decorreu entre a Cova da Moura e o Teatro de Alfornelos, juntando moradores, artistas e pensadores em torno de ideias para imaginar, construir e disputar coletivamente o espaço urbano. 
                O festival reafirma a sua visão de um trabalho artístico profundamente comprometido com a transformação social.


              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
