import i18next from "i18next";
import en from "./locales/en";
import es from "./locales/es";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: { global: es },
    en: { global: en },
  },
});

export default i18next;
