import React from "react";
import "../../css/display333.css";

export default function NxNxN({ cube }) {
  return (
    <div className="dNxNContainer">
      {cube.map((face, i) => (
        <div
          key={`face${i}`}
          className={`face face${i}`}
          style={{ "--n": Math.sqrt(cube[0].length) }}
        >
          {face.map((tile, j) => (
            <div key={`face${i}${j}`} className={`tile ${tile}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
}
