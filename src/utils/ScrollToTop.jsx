// src/components/Utils/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Obtém o objeto de localização (que muda a cada rota)
  const { pathname } = useLocation();

  // useEffect será executado sempre que o 'pathname' (a rota) mudar
  useEffect(() => {
    // Rola a janela para o topo
    // O 'behavior: "smooth"' é opcional, mas garante uma rolagem suave
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]); // Dependência: só executa quando o pathname muda

  // Este componente não renderiza nada no DOM, ele é puramente lógico
  return null;
};

export default ScrollToTop;