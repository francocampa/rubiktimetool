import { useTranslation } from "react-i18next";
import DNxNxN from "@/components/cubeDisplays/NxNxN";
import categoryManager from "@/controllers/categoryManager";
import Timer from "@/components/timer/Timer"
import { useState, useEffect } from "react";
import "@/css/timer.css";

export default function TimerPage(props) {
  if (!props || !Object.keys(props).length) return (<h1>loading</h1>)
  
  const [t, i18n] = useTranslation("global")
  let s = categoryManager.getScramble(props.cat);

  const [scramble, setScramble] = useState(s);
  const [cube, setCube] = useState(categoryManager.getDisplay(props.cat, s));
  const [times, setTimes] = useState([]);
  const [isOnSolve, setIsOnSolve] = useState(false);

  useEffect(() => {
    setCube(categoryManager.getDisplay(props.cat, scramble))
  }, [scramble]);

  function startTimer() {
    setIsOnSolve(true);
  }
  function stopTimer(time) {
    setIsOnSolve(false);
    setTimes(prev => [...prev, time])
  }
  return (
    <>
      <h1>{t("Timer")}</h1>
      <button onClick={() => setScramble(categoryManager.getScramble(props.cat))} {...isOnSolve && "disabled"}>
        New Scramble
      </button>
      <Timer start={startTimer} stop={stopTimer} />
      <p className="scramble">{scramble.map((move) => move + " ")}</p>
      <DNxNxN cube={cube} />
    </>
  );
}
