// src/components/HeroCarousel.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images = [
  { url: '/images/clarahd.png', alt: 'Descrição da Imagem 1' },
  { url: '/images/cronosinsta.png', alt: 'Descrição da Imagem 2' },
  { url: '/images/terceira.jpg', alt: 'Descrição da Imagem 3' },
];

const HeroCarousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efeito para a passagem automática das imagens a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imagens do Carrossel */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      ))}

      {/* Camada de escurecimento (overlay) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Conteúdo principal (Hero) que ficará por cima das imagens */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>

      {/* Botões de navegação */}
      <Button
        onClick={goToPrevious}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 bg-black/20 hover:bg-black/40 rounded-full z-20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={goToNext}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 bg-black/20 hover:bg-black/40 rounded-full z-20"
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      {/* Indicadores de posição */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;