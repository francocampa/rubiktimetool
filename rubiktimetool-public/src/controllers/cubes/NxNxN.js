export default class Cube3x3x3 {
  static getBaseDisplayCube(n) {
    let cube = [];
    for (let i = 0; i < 6; i++) {
      cube[i] = [];
      for (let j = 0; j < n * n; j++) {
        cube[i][j] = colorPerFace[i];
      }
    }
    return cube;
  }
  static getDisplayCube(scrambledCube) {
    if (!scrambledCube) return [];
    let n = scrambledCube.length;
    let upFace = getFaceDisplay(n, scrambledCube, "x", true);
    let downFace = getFaceDisplay(n, scrambledCube, "x", false);
    let leftFace = getFaceDisplay(n, scrambledCube, "y", true);
    let rightFace = getFaceDisplay(n, scrambledCube, "y", false);
    let frontFace = getFaceDisplay(n, scrambledCube, "z", true);
    let backFace = getFaceDisplay(n, scrambledCube, "z", false);
    return [upFace, leftFace, frontFace, rightFace, backFace, downFace];
  }

  static generateScramble(n) {
    let scramble = [this.getRandomMove(n).move.move];
    for (let i = 1; i < scrambleMoves[n - 1]; i++) {
      let isRedundant = false;
      let moveObj;
      do {
        isRedundant = false;
        moveObj = this.getRandomMove(n);
        scramble[i] = moveObj.prepend + moveObj.move.move + moveObj.type;
        if (scramble[i - 2]) {
          isRedundant =
            scramble[i - 2].includes(moveObj.move.move) &&
            scramble[i - 1].includes(moveObj.move.redundant);
        }
      } while (scramble[i - 1].includes(moveObj.move.move) || isRedundant);
    }
    // console.log(this.getDisplayCube(n));

    return scramble;
  }
  static getRandomMove(n) {
    let is22Valid = true;
    let move;
    let type;
    let prepend;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
      type = types[Math.floor(Math.random() * types.length)];
      if (n > 3) {
        type = ["", "w"][Math.floor(Math.random() * 2)] + type;
        prepend =
          n > 5 && type.includes("w")
            ? ["", "3"][Math.floor(Math.random() * 2)]
            : "";
      }
      //Validate for 22
      is22Valid = n == 2 ? !["D", "L", "B"].includes(move.move) : true;
    } while (!is22Valid);
    return { move, type, prepend: prepend ? prepend : "" };
  }
  static getScrambledCube(n, scramble) {
    let cube = this.getBaseCube(n);
    scramble.forEach((move) => {
      if (move.includes("R") || move.includes("L")) {
        cube = this.moveYFace(cube, move);
      } else if (move.includes("F") || move.includes("B")) {
        cube = this.moveZFace(cube, move);
      } else if (move.includes("U") || move.includes("D")) {
        cube = this.moveXFace(cube, move);
      }
    });
    return this.getDisplayCube(cube);
  }
  static getBaseCube(n) {
    let cube = [];
    for (let x = 0; x < n; x++) {
      cube[x] = [];
      for (let y = 0; y < n; y++) {
        cube[x][y] = [];
        for (let z = 0; z < n; z++) {
          let xColor = y == 0 ? "w" : y == n - 1 ? "y" : "";
          let yColor = x == 0 ? "o" : x == n - 1 ? "r" : "";
          let zColor = z == 0 ? "g" : z == n - 1 ? "b" : "";
          cube[x][y][z] = { x: xColor, y: yColor, z: zColor };
        }
      }
    }
    return cube;
  }
  static moveXFace(cube, move) {
    cube = cube ? cube : getBaseCube(2);
    let start = move.includes("U");
    const n = cube.length;
    let movedCube = JSON.parse(JSON.stringify(cube));
    for (let x = 0; x < n; x++) {
      for (let z = 0; z < n; z++) {
        let piece = cube[x][start ? 0 : n - 1][z];
        let auxZ = z;
        let auxX = x;
        let yFace = x == 0 ? "l" : x == n - 1 ? "r" : ""; //left or right
        let zFace = z == 0 ? "f" : z == n - 1 ? "b" : ""; //front or back
        let position = yFace + zFace;
        let movesNeeded;
        if (move.includes("U")) {
          movesNeeded = move.includes("'") ? 3 : move.includes("2") ? 2 : 1;
        } else {
          movesNeeded = move.includes("'") ? 1 : move.includes("2") ? 2 : 3;
        }
        for (let i = 0; i < movesNeeded; i++) {
          let newZ = "";
          let newX = "";
          if (!position.length) {
            // centers
            newX = auxX;
            newZ = auxZ;
          } else if (position.length == 1) {
            // edges
            if (position == "l" || position == "r") {
              newX = auxZ;
              newZ = position == "l" ? n - 1 : 0;
            } else {
              newX = position == "f" ? 0 : n - 1;
              newZ = n - 1 - auxX;
            }
          } else {
            // corners
            if (position == "lf" || position == "rf") {
              newX = 0;
              newZ = position == "lf" ? n - 1 : 0;
            } else if (position == "lb" || position == "rb") {
              newX = n - 1;
              newZ = position == "lb" ? n - 1 : 0;
            }
          }
          auxX = newX;
          auxZ = newZ;
          yFace = auxX == 0 ? "l" : auxX == n - 1 ? "r" : ""; //left or right
          zFace = auxZ == 0 ? "f" : auxZ == n - 1 ? "b" : ""; //front or back
          position = yFace + zFace;
        }
        movedCube[auxX][start ? 0 : n - 1][auxZ] = {
          x: piece.x,
          y: movesNeeded != 2 ? piece.z : piece.y,
          z: movesNeeded != 2 ? piece.y : piece.z,
        };
      }
    }
    return movedCube;
  }
  static moveYFace(cube, move) {
    cube = cube ? cube : getBaseCube(2);
    let start = move.includes("L");
    const n = cube.length;
    let movedCube = JSON.parse(JSON.stringify(cube));
    for (let y = 0; y < n; y++) {
      for (let z = 0; z < n; z++) {
        let piece = cube[start ? 0 : n - 1][y][z];
        let auxZ = z;
        let auxY = y;
        let xFace = y == 0 ? "u" : y == n - 1 ? "d" : ""; //up or down
        let zFace = z == 0 ? "f" : z == n - 1 ? "b" : ""; //front or back
        let position = xFace + zFace;
        let movesNeeded;
        if (move.includes("L")) {
          movesNeeded = move.includes("'") ? 3 : move.includes("2") ? 2 : 1;
        } else {
          movesNeeded = move.includes("'") ? 1 : move.includes("2") ? 2 : 3;
        }
        for (let i = 0; i < movesNeeded; i++) {
          let newZ = "";
          let newY = "";
          if (!position.length) {
            // centers
            newY = auxY;
            newZ = auxZ;
          } else if (position.length == 1) {
            // edges
            if (position == "u" || position == "d") {
              newY = n - 1 - auxZ;
              newZ = position == "d" ? n - 1 : 0;
            } else {
              newY = position == "f" ? n - 1 : 0;
              newZ = auxY;
            }
          } else {
            // corners
            if (position == "ub" || position == "db") {
              newY = 0;
              newZ = position == "db" ? n - 1 : 0;
            } else if (position == "uf" || position == "df") {
              newY = n - 1;
              newZ = position == "df" ? n - 1 : 0;
            }
          }
          auxY = newY;
          auxZ = newZ;
          xFace = auxY == 0 ? "u" : auxY == n - 1 ? "d" : ""; //up or down
          zFace = auxZ == 0 ? "f" : auxZ == n - 1 ? "b" : ""; //front or back
          position = xFace + zFace;
        }
        movedCube[start ? 0 : n - 1][auxY][auxZ] = {
          x: movesNeeded != 2 ? piece.z : piece.x,
          y: piece.y,
          z: movesNeeded != 2 ? piece.x : piece.z,
        };
      }
    }
    return movedCube;
  }
  static moveZFace(cube, move) {
    cube = cube ? cube : getBaseCube(2);
    let start = move.includes("F");
    const n = cube.length;
    let movedCube = JSON.parse(JSON.stringify(cube));
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        let piece = cube[x][y][start ? 0 : n - 1];
        let auxX = x;
        let auxY = y;
        let xFace = y == 0 ? "u" : y == n - 1 ? "d" : ""; //up or down
        let yFace = x == 0 ? "l" : x == n - 1 ? "r" : ""; //left or right
        let position = xFace + yFace;
        let movesNeeded;
        if (move.includes("F")) {
          movesNeeded = move.includes("'") ? 3 : move.includes("2") ? 2 : 1;
        } else {
          movesNeeded = move.includes("'") ? 1 : move.includes("2") ? 2 : 3;
        }
        for (let i = 0; i < movesNeeded; i++) {
          let newX = "";
          let newY = "";
          if (!position.length) {
            // centers
            newY = auxY;
            newX = auxX;
          } else if (position.length == 1) {
            // edges
            if (position == "u" || position == "d") {
              newY = auxX;
              newX = position == "u" ? n - 1 : 0;
            } else {
              newY = position == "r" ? n - 1 : 0;
              newX = n - 1 - auxY;
            }
          } else {
            // corners
            if (position == "ul" || position == "dl") {
              newY = 0;
              newX = position == "ul" ? n - 1 : 0;
            } else if (position == "ur" || position == "dr") {
              newY = n - 1;
              newX = position == "ur" ? n - 1 : 0;
            }
          }
          auxY = newY;
          auxX = newX;
          xFace = auxY == 0 ? "u" : auxY == n - 1 ? "d" : ""; //up or down
          yFace = auxX == 0 ? "l" : auxX == n - 1 ? "r" : ""; //left or right
          position = xFace + yFace;
        }
        movedCube[auxX][auxY][start ? 0 : n - 1] = {
          x: movesNeeded != 2 ? piece.y : piece.x,
          y: movesNeeded != 2 ? piece.x : piece.y,
          z: piece.z,
        };
      }
    }
    return movedCube;
  }
}
const moves = [
  { move: "R", redundant: "L" },
  { move: "L", redundant: "R" },
  { move: "U", redundant: "D" },
  { move: "D", redundant: "U" },
  { move: "F", redundant: "B" },
  { move: "B", redundant: "F" },
];
const types = ["", "2", "'"];
const colorPerFace = ["w", "o", "g", "r", "b", "y"];
const scrambleMoves = [0, 11, 20, 47, 60, 80, 100];

function getFaceDisplay(n, cube, plane, start) {
  let face = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let auxI = i;
      let auxJ = j;
      if (plane == "x") {
        auxI = j;
        auxJ = start ? n - 1 - i : i;
      } else if (plane == "z") {
        auxI = j;
        auxJ = i;
      } else if (plane == "y") {
        auxI = i;
        auxJ = start ? n - 1 - j : j;
      }
      switch (plane) {
        case "x":
          face.push(cube[auxI][start ? 0 : n - 1][auxJ].x);
          break;
        case "y":
          face.push(cube[start ? 0 : n - 1][auxI][auxJ].y);
          break;
        case "z":
          face.push(cube[auxI][auxJ][start ? 0 : n - 1].z);
          break;
      }
    }
  }
  return face;
}

function moveZFace(cube, move) {}
