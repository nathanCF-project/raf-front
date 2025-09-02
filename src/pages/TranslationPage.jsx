// src/pages/WhatWeDo/TranslationPage.jsx
import { BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

export default function PublishingPage() {

const { t } = useTranslation();

  const books = [
    { id: 1, title: t("publishing.bookPlaceholderTitle"), author: t("publishing.bookPlaceholderAuthor") },
    { id: 2, title: t("publishing.bookPlaceholderTitle"), author: t("publishing.bookPlaceholderAuthor") },
    { id: 3, title: t("publishing.bookPlaceholderTitle"), author: t("publishing.bookPlaceholderAuthor") },
    { id: 4, title: t("publishing.bookPlaceholderTitle"), author: t("publishing.bookPlaceholderAuthor") },
    { id: 5, title: t("publishing.bookPlaceholderTitle"), author: t("publishing.bookPlaceholderAuthor") },
    { id: 6, title: t("publishing.bookPlaceholderTitle"), author: t("publishing.bookPlaceholderAuthor") },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-balance">{t("publishing.headerTitle")}</h1>

          {/* Introductory text */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed text-pretty">
              {t("publishing.introText")}
            </p>
          </div>
        </header>

        {/* Featured Card */}
        <div className="mb-20">
          <Card className="max-w-4xl mx-auto border-gray-200 shadow-lg">
            <CardContent className="p-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">{t("publishing.visionTitle")}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t("publishing.visionText")}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
               
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Translated Books Section */}
        <section>
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t("publishing.booksTitle")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book.id} className="group">
                <Card className="border-gray-200 hover:border-red-300 transition-colors duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="aspect-[2/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={`https://via.placeholder.com/200x300/f3f4f6/374151?text=${encodeURIComponent(book.title)}`}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-balance">{book.title}</h3>
                    <p className="text-red-600 font-medium">{book.author}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}


