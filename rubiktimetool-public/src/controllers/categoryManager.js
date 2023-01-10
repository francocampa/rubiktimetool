import NxNxN from "@/controllers/cubes/NxNxN";

export default class CategoryManager {
  static getScramble(cat) {
    if (!cat) return;
    if (cat.split("x").length == 3) {
      return NxNxN.generateScramble(cat.split("x")[0]);
    }
    switch (cat) {
      case "skewb":
        break;
      case "pyraminx":
        break;
      case "square1":
        break;
      case "clock":
        break;
    }
  }
  static getDisplay(cat, scramble) {
    if (!cat) return;
    if (cat.split("x").length == 3) {
      return NxNxN.getScrambledCube(cat.split("x")[0], scramble);
    }
    switch (cat) {
      case "skewb":
        break;
      case "pyraminx":
        break;
      case "square1":
        break;
      case "clock":
        break;
    }
  }
}
