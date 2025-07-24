// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Calendar, Users, Megaphone, Heart } from "lucide-react"

export default function DefesaDaCultura() {
  const projects = [
    {
      title: "Não queremos viver num país de medo",
      description:
        "Demonstração nacional organizada em resposta à agressão sofrida pelo ator Aderito Lopes, mobilizando 12 cidades em defesa da liberdade e contra o medo.",
      date: "2025",
      type: "Demonstração",
      status: "Realizado",
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      title: "Fórum de Transparência Cultural",
      description:
        "Iniciativa para questionar a atual distribuição de recursos culturais e promover maior transparência no setor.",
      date: "Em desenvolvimento",
      type: "Fórum",
      status: "Em curso",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Rede de Coletivos Culturais",
      description:
        "Construção de uma rede colaborativa entre sindicatos, coletivos e cidadãos para fortalecer o ecossistema cultural português.",
      date: "2025-2026",
      type: "Parceria",
      status: "Planeado",
      icon: <Heart className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-900">Defesa da Cultura</h1>
        </div>
      </header>

      {/* Hero/Intro Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                A Rafeira • Coletivo Artístico
              </Badge>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">
                Cultura como Campo de Ação Política
              </h2>
            </div>

            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                Em 2025, A Rafeira organizou a manifestação{" "}
                <strong className="text-slate-900">'Não queremos viver num país de medo'</strong>, em resposta à
                agressão sofrida pelo ator Aderito Lopes. A ação mobilizou pessoas em 12 cidades do país, unindo
                sindicatos, coletivos e cidadãos numa declaração pela liberdade e contra o medo.
              </p>

              <p className="text-slate-700 leading-relaxed text-base md:text-lg mt-6">
                A Rafeira acredita que a cultura é um campo de ação política e pretende abalar o setor, questionando a
                atual distribuição de recursos e contribuindo ativamente para a construção de um ecossistema cultural
                mais justo, transparente e sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-20 bg-white/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Projetos e Ações</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Iniciativas que materializam o nosso compromisso com a transformação do panorama cultural português
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      {project.icon}
                    </div>
                    <Badge
                      variant={
                        project.status === "Realizado"
                          ? "default"
                          : project.status === "Em curso"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 leading-tight">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span>{project.date}</span>
                    <span className="text-slate-300">•</span>
                    <span>{project.type}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">{project.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Junta-te ao Movimento</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              A transformação cultural acontece através da ação coletiva. Participa na construção de um futuro mais
              justo para a cultura portuguesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-medium">
                Saber Mais
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600">© 2025 A Rafeira • Defesa da Cultura</p>
        </div>
      </footer>
    </div>
  )
}

