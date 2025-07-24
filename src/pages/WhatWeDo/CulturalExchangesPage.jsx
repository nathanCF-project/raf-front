// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import { Card, CardContent } from "@/components/ui/card"
import NewsletterSubscribe from '../../components/Forms/NewsletterSubscribe';


export default function Component() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-neutral-800 mb-4">Intercâmbios Culturais</h1>
          <div className="w-24 h-px bg-neutral-300 mx-auto"></div>
        </header>

        {/* Introduction Section */}
        <section className="mb-20">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl leading-relaxed text-neutral-700 text-center max-w-3xl mx-auto">
                Promovemos trocas a nível nacional com associações de várias regiões do país e, a nível europeu, temos
                experiência em programas como Erasmus+, CERV e Europa Criativa. Ambas as diretoras artísticas integram a
                rede Culture Action Europe. Globalmente, a Rafeira tem vindo a abrir pontes com o continente asiático,
                em particular com a China, através do teatro, e com África, começando por Cabo Verde.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Future Projects Section */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-800 mb-8">Próximos Projetos</h2>
          <div className="py-12">
            <p className="text-lg text-neutral-500 italic font-light">Está quase, juro. Ou pelo menos, a caminho.</p>
          </div>
        </section>
      </div>
          <NewsletterSubscribe/>
    </div>
  )
}
