export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Large 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          <div className="text-6xl mb-4">🤔</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Página não encontrada</h2>
          <p className="text-gray-600 text-lg">Oops! A página que procuras não existe.</p>
        </div>

        {/* Return Home Button */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            ← Voltar ao início
          </a>
        </div>

        {/* Additional Help Text */}
        <p className="text-sm text-gray-500">
          Se acreditas que isto é um erro, por favor{" "}
          <a href="/contact" className="text-blue-600 hover:text-blue-500 underline">
            contacta-nos
          </a>
        </p>
      </div>
    </div>
  )
}
