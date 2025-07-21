// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";
//import "./HowWeThinkPage.css"; // para ajustes 

export default function HowWeThinkPage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Como Pensamos</h1>
        <p className="lead text-muted">
          A nossa forma de estar, fazer e resistir no mundo.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">

          <blockquote className="blockquote px-4 py-3 border-start border-4 border-dark bg-light mb-4">
            <p className="mb-0 fst-italic">
              Acreditamos numa arte que dialoga com o território, com as memórias e com as urgências sociais.
            </p>
          </blockquote>

          <blockquote className="blockquote px-4 py-3 border-start border-4 border-warning bg-light mb-4">
            <p className="mb-0 fst-italic">
              A prática artística não é neutra — é um gesto político, relacional e afetivo.
            </p>
          </blockquote>

          <blockquote className="blockquote px-4 py-3 border-start border-4 border-primary bg-light mb-4">
            <p className="mb-0 fst-italic">
              Valorizamos a escuta, o tempo coletivo e a criação que parte de encontros reais.
            </p>
          </blockquote>

          <div className="mt-5 text-muted text-center">
            <p className="fst-italic">
              “Pensar é resistir. Criar é existir.”
            </p>
            <p>— A Rafeira</p>
          </div>
        </div>
      </div>
    </div>
  );
}
