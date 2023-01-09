import React from "react";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="menu">
      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language == "es" ? "en" : "es");
        }}
      >
        {t("Change language")}
      </button>

      <button
        onClick={() =>
          document.getElementsByTagName("body")[0].classList.toggle("light")
        }
      >
        Change theme
      </button>
    </div>
  );
}
