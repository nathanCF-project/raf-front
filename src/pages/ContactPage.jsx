// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import React from "react";

export default function ContactPage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Contactos</h1>
        <p className="lead text-muted">Fale conosco! Estamos disponíveis para esclarecer dúvidas, parcerias ou colaborações.</p>
      </div>

      <div className="row g-4">
        {/* Formulário de contacto */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input type="text" className="form-control" id="name" placeholder="Seu nome" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="seu@email.com" required />
              </div>

              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Assunto</label>
                <input type="text" className="form-control" id="subject" placeholder="Assunto da mensagem" />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensagem</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Escreva sua mensagem aqui..." required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
            </form>
          </div>
        </div>

        {/* Informações de contacto */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4 bg-light h-100">
            <h5 className="fw-bold mb-3">Informações de Contacto</h5>
            <p><strong>Email:</strong> arafeira.estruturadecriacao@gmail.com</p>
            <p><strong>Morada:</strong> Rua Exemplo, 123 – Lisboa</p>
            <p><strong>Telefone:</strong> (+351) 962 185 565 / (+351) 961 200 611</p>
            <div className="mt-3">
              <strong>Siga-nos:</strong>
              <div className="d-flex gap-3 mt-2">
                <a href="#" className="text-primary"><i className="bi bi-facebook"></i> Facebook</a>
                <a href="#" className="text-danger"><i className="bi bi-instagram"></i> Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
