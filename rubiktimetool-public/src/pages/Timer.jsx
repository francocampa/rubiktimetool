import { useTranslation } from "react-i18next";
import DNxNxN from "../components/cubeDisplays/NxNxN";
import NxNxN from "../controllers/cubes/NxNxN";
import { useState, useEffect } from "react";
import "../css/timer.css";

export default function Timer() {
  const [t, i18n] = useTranslation("global");
  const [n, setN] = useState(3);
  let s = NxNxN.generateScramble(n);

  const [scramble, setScramble] = useState(s);
  const [cube, setCube] = useState(NxNxN.getScrambledCube(n, s));
  useEffect(() => {
    s = NxNxN.generateScramble(n);
    setCube(NxNxN.getScrambledCube(n, s));
    setScramble(s);
  }, [n]);
  return (
    <>
      <h1>{t("Timer")}</h1>
      <button onClick={() => setScramble(NxNxN.generateScramble(n))}>
        New Scramble
      </button>
      <button onClick={() => setCube((prev) => NxNxN.moveXFace(prev, "U"))}>
        Move U
      </button>
      <button onClick={() => setCube((prev) => NxNxN.moveXFace(prev, "D"))}>
        Move D
      </button>
      <button onClick={() => setCube((prev) => NxNxN.moveYFace(prev, "R"))}>
        Move R
      </button>
      <button onClick={() => setCube((prev) => NxNxN.moveYFace(prev, "L"))}>
        Move L
      </button>
      <button onClick={() => setCube((prev) => NxNxN.moveZFace(prev, "F"))}>
        Move F
      </button>
      <button onClick={() => setCube((prev) => NxNxN.moveZFace(prev, "B"))}>
        Move B
      </button>
      <input type="number" value={n} onChange={(e) => setN(e.target.value)} />
      <p className="scramble">{scramble.map((move) => move + " ")}</p>
      <DNxNxN cube={NxNxN.getDisplayCube(cube)} />
    </>
  );
}
