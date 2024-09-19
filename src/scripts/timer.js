class Timer {
  constructor() {
    if (Timer.instance) {
      return Timer.instance;
    }
    this.time = 0;
    this.timer = null;
    this.observers = [];
    Timer.instance = this;
  }

  static getInstance() {
    if (!Timer.instance) {
      Timer.instance = new Timer();
    }
    return Timer.instance;
  }

  start() {
    this.timer = setInterval(() => {
      this.time += 1;
      this.notifyObservers();
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  reset() {
    this.time = 0;
    this.notifyObservers();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer(this.time));
  }
}

export default Timer;
