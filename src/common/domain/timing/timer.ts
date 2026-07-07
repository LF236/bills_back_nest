export class Timer {
  private readonly startedAt = performance.now();

  static create() {
    return new Timer();
  }

  stop() : number {
    return performance.now() - this.startedAt;
  }
}