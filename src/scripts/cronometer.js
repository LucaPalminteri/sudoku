import Timer from "./timer.js";

class Clock extends Timer {
  constructor() {
    super();
  }

  getFormattedTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(number) {
    return number < 10 ? `0${number}` : number;
  }
}

export default Clock;
