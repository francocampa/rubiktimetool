import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TimerPage from "@/pages/Timer";
import StatsPage from "@/pages/Stats";
import { useTranslation } from "react-i18next";
import Menu from "@/components/menu/Menu";
import "@/css/app.css";

function App() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="appContainer">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<TimerPage cat="3x3x3" />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
