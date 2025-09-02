import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importe seus arquivos de tradução
import translationEN from './en/translation.json';
import translationPT from './pt/translation.json';

// Importando traduções (exemplo com inglês e português)
const resources = {
   en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  }
};

i18n
  .use(LanguageDetector) // Detecta idioma do navegador
  .use(initReactI18next) // Integração com React
  .init({
    resources,
    fallbackLng: "pt", // Se não encontrar o idioma, cai para PT
    debug: true,
    interpolation: {
      escapeValue: false, // React já faz o escaping
    },
  });

export default i18n;
