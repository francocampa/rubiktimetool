export default class Solve {
  constructor(data = {}) {
    this.cat = data.cat || null;
    this.scramble = data.scramble || [];
    this.time = data.time || null;
    this.penalties = data.penalties || {};
    this.comment = data.comment || null;
  }
}
