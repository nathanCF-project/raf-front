// src/pages/WhatWeDo/CultureDefensePage.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Calendar, Users, Megaphone, Heart } from "lucide-react"
import { useTranslation } from "react-i18next"


export default function DefesaDaCultura() {

      const { t } = useTranslation()

  const projects = [
    {
      title: t("cultureDefense.project1Title"),
      description:
        t("cultureDefense.project1Description"),
      date: "2025",
      type: t("cultureDefense.project1Type"),
      status: t("cultureDefense.statusRealized"),
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      title: t("cultureDefense.project2Title"),
      description:
        t("cultureDefense.project2Description"),
      date: "2025",
      type: t("cultureDefense.project2Type"),
      status: t("cultureDefense.statusInProgress"),
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: t("cultureDefense.project3Title"),
      description:
        t("cultureDefense.project3Description"),
      date: "2025-2026",
      type: t("cultureDefense.project3Type"),
      status: t("cultureDefense.statusPlanned"),
      icon: <Heart className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-900">{t("cultureDefense.headerTitle")}</h1>
        </div>
      </header>

      {/* Hero/Intro Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                 {t("cultureDefense.heroBadge")}
              </Badge>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">
                {t("cultureDefense.heroTitle")}
              </h2>
            </div>

            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                 {t("cultureDefense.heroText1")}
              </p>

              <p className="text-slate-700 leading-relaxed text-base md:text-lg mt-6">
                 {t("cultureDefense.heroText2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-20 bg-white/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t("cultureDefense.projectsTitle")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {t("cultureDefense.projectsSubtitle")}
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("cultureDefense.ctaTitle")}</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
               {t("cultureDefense.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-medium">
                {t("cultureDefense.buttonLearnMore")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                {t("cultureDefense.buttonContact")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600">{t("cultureDefense.footerText")}</p>
        </div>
      </footer>
    </div>
  )
}

