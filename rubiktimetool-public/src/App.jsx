import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TimerPage from "./pages/Timer";
import StatsPage from "./pages/Stats";
import { useTranslation } from "react-i18next";

function App() {
  const [t, i18n] = useTranslation("global");

  return (
    <div>
      <h1>Header</h1>
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
      <button
        onClick={() => i18n.changeLanguage(i18n.language == "es" ? "en" : "es")}
      >
        {t("Change language")}
      </button>
    </div>
  );
}

export default App;
