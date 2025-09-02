// src/pages/WhatWeDo/ArtisticCreationPage.jsx
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { Badge } from "../../components/ui/badge"
import { Calendar, Clock, MapPin, User, ExternalLink } from "lucide-react"
import { useTranslation } from 'react-i18next';
//import Image from "next/image"
//import Link from "next/link"

export default function FormacaoPage() {

  const { t } = useTranslation(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">{t('training.headerTitle')}</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              {t('training.headerSubtitle')}
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
                    {t('training.course1Title')}
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    {t('training.course1Subtitle')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{t('training.course1InfoDate')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>{t('training.course1InfoTime')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <Badge variant="secondary">{t('training.course1InfoLocation')}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="h-4 w-4" />
                      <span>{t('training.course1InfoInstructor')}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">{t('training.course1ModulesTitle')}</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900">Aula 1:</span>
                        <div>
                          <p className="font-medium">{t('training.course1Module1Title')}</p>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            <li>• {t('training.course1Module1List1')}</li>
                            <li>• {t('training.course1Module1List2')}</li>
                            <li>• {t('training.course1Module1List3')}</li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900">Aula 2:</span>
                        <div>
                          <p className="font-medium">{t('training.course1Module2Title')}</p>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            <li>• {t('training.course1Module2List1')}</li>
                            <li>• {t('training.course1Module2List2')}</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-700 italic">
                      <strong>
                      {t('training.course1Quote')} </strong>
                    </p>
                  </div>

                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <a href="https://forms.gle/mMKRsWULCGz9cRG56" target="_blank" rel="noopener noreferrer">{t('training.buttonRegister')}</a>

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
                     {t('training.course2Title')}
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    {t('training.course2Subtitle')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{t('training.course2InfoDate')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>{t('training.course2InfoTime')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
                      <MapPin className="h-4 w-4" />
                      <Badge variant="secondary">{t('training.course2InfoLocation')}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">{t('training.course2ModulesTitle')}</h4>
                    <ol className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">1.</span>
                        <span>{t('training.course2Module1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">2.</span>
                        <span>{t('training.course2Module2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">3.</span>
                        <span>{t('training.course2Module3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-slate-900 min-w-[1.5rem]">4.</span>
                        <span>{t('training.course2Module4')}</span>
                      </li>
                    </ol>
                  </div>

                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <a href="https://forms.gle/mMKRsWULCGz9cRG56"target="_blank" rel="noopener noreferrer">{t('training.buttonRegister')}</a>

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
                  src="images/clarajapa.jpg"
                  alt="texto descritivo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {t('training.course3Title')}
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    {t('training.course3Subtitle')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{t('training.course3InfoDate')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{t('training.course3InfoLocation')}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      💡 {t('training.course3Note')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">{t('training.course3ObjectivesTitle')}</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{t('training.course3Objective1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{t('training.course3Objective2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{t('training.course3Objective3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{t('training.course3Objective4')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                        <a href="https://www.bol.pt/Comprar/Bilhetes/159761-rakugo_a_arte_japonesa_de_contar_historias_curso-museu_do_oriente/"
                        target="_blank" rel="noopener noreferrer">
                        {t('training.buttonRegister')}</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                        <a href="https://www.foriente.pt/detalhe.php?id=FD00EDC0-64C1-4213-B6BD-ECEE939D94E3&area=cursos-conferencias-e-workshops"
                        target="_blank" rel="noopener noreferrer">
                        {t('training.buttonMoreInfo')}</a>

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

