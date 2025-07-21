// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";
//import "./TrainingPage.css";

export default function TrainingPage() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Formações</h1>

      {/* Curso 1 */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <img
            src="/src/assets/Curso-imposto1.jpg"
            alt="Curso FUCK!"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>FUCK! O que é que um trabalhador da cultura tem de saber??</h2>
          <p>
            Formação prática e essencial para artistas e profissionais da cultura que
            precisam entender contratos, recibos verdes, e o Estatuto da Cultura.
          </p>
          <p><strong>Datas:</strong> 29 de setembro e 6 de outubro</p>
          <p><strong>Formato:</strong> Online (2h cada aula)</p>
          <a
            className="btn btn-primary"
            href="https://forms.gle/mMKRsWULCGz9cRG56"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inscrever-se
          </a>
        </div>
      </div>

     
      <div className="row mb-5 align-items-center">
        <div className="col-md-6 order-md-2">
          <img
            src="/src/assets/hero1.jpg"
            alt="Curso Rakugo"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>Rakugo | A Arte Japonesa de Contar Histórias</h2>
          <p>
            Curso introdutório à técnica tradicional de performance japonesa, com sessões práticas e teoria cultural.
          </p>
          <a
            className="btn btn-outline-primary"
            href="https://www.bol.pt/Comprar/Bilhetes/159761-rakugo_a_arte_japonesa_de_contar_historias_curso-museu_do_oriente/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver detalhes / Inscrição
          </a>
        </div>
      </div>
     

    </div>
  );
}
