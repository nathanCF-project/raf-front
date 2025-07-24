// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { Badge } from "../../components/ui/badge"
import { Calendar, Clock, MapPin, User, ExternalLink } from "lucide-react"
//import Image from "next/image"
//import Link from "next/link"

export default function FormacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">Formação</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Dedicamo-nos à formação e capacitação de profissionais da cultura, oferecendo cursos práticos e
              especializados que respondem às necessidades reais do setor. A nossa missão é empoderar artistas e agentes
              culturais com conhecimento técnico, jurídico e criativo essencial para o desenvolvimento das suas
              carreiras e projetos.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Course 1 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full">
                <img
                  src="images/Curso-imposto1.jpg"
                  alt="texto descritivo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    FUCK! O que é que um trabalhador da cultura tem de saber??
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    Enquadramento Jurídico-Legal dos Profissionais do Espetáculo
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>29 set & 6 out</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>2h cada aula</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <Badge variant="secondary">ONLINE</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="h-4 w-4" />
                      <span>Sofia Leal</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Módulos:</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900">Aula 1:</span>
                        <div>
                          <p className="font-medium">Quais os meus direitos e os meus deveres?</p>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            <li>• Enquadramento legal dos profissionais da cultura</li>
                            <li>• Tipos de contratos</li>
                            <li>• Recibos verdes: Segurança Social e Finanças</li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900">Aula 2:</span>
                        <div>
                          <p className="font-medium">Onde me enquadro?</p>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            <li>• Estatuto do Profissional da Cultura</li>
                            <li>• Organizações coletivas, representação e direitos</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-700 italic">
                      Formação prática, clara, com espaço para perguntas reais.
                      <strong>
                        {" "}
                        Se não percebes o que assinas, o que declaras ou o que pagas — este curso é para ti!
                      </strong>
                    </p>
                  </div>

                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <a href="https://forms.gle/mMKRsWULCGz9cRG56" target="_blank" rel="noopener noreferrer">Inscreve-te!</a>

                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>

          <Separator className="my-12" />

          {/* Course 2 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full md:order-2">
                <img
                  src="images/hero1.jpg"
                  alt="texto descritivo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:order-1">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    FUCK!!! COMO ARRANJAR DINHEIRO PARA A CRIAÇÃO ARTÍSTICA?
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    Uma formação prática para artistas e agentes culturais que querem financiar os seus projetos sem
                    vender a alma ao diabo
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>5, 12, 19 & 26 mai</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>19h30 - 22h30</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
                      <MapPin className="h-4 w-4" />
                      <Badge variant="secondary">ONLINE</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Módulos:</h4>
                    <ol className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">1.</span>
                        <span>Competir vs Colaborar em rede</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">2.</span>
                        <span>Ainda há dinheiro em Portugal para mim?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">3.</span>
                        <span>Sugarbaby da Europa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">4.</span>
                        <span>E se nada funcionar?</span>
                      </li>
                    </ol>
                  </div>

                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <a href="https://forms.gle/mMKRsWULCGz9cRG56"target="_blank" rel="noopener noreferrer">Inscreve-te!</a>

                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>

          <Separator className="my-12" />

          {/* Course 3 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full">
                <img
                  src="images/japones.jpg"
                  alt="texto descritivo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Rakugo | A Arte Japonesa de Contar Histórias
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    Uma introdução prática e teórica ao Rakugo — arte narrativa tradicional japonesa — com foco em
                    performance, humor e expressão vocal
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>5 encontros com conteúdos históricos, técnicos e práticos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>Museu do Oriente</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      💡 Este curso resulta de uma investigação apoiada pela Fundação Oriente
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Objetivos:</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>Difundir o Rakugo em Portugal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>Capacitar os participantes com técnicas narrativas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>Estimular a experimentação performativa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>Promover o intercâmbio artístico com o Japão</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                        <a href="https://www.bol.pt/Comprar/Bilhetes/159761-rakugo_a_arte_japonesa_de_contar_historias_curso-museu_do_oriente/"
                        target="_blank" rel="noopener noreferrer">
                        Inscreve-te!</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                        <a href="https://www.foriente.pt/detalhe.php?id=FD00EDC0-64C1-4213-B6BD-ECEE939D94E3&area=cursos-conferencias-e-workshops"
                        target="_blank" rel="noopener noreferrer">
                        Mais Informações</a>

                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Formação - Coletivo Artístico. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

