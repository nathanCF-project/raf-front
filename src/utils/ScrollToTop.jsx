// src/components/Utils/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Obtem o objeto de localizacao (que muda a cada rota)
  const { pathname } = useLocation();

  // useEffect sera executado sempre que o 'pathname' (a rota) mudar
  useEffect(() => {
    // Rola a janela para o topo
    // O 'behavior: "smooth"' é opcional, mas garante uma rolagem suave
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]); // Dependencia: so executa quando o pathname muda

  // Este componente nao renderiza nada no DOM, é puramente lógico
  return null;
};

export default ScrollToTop;