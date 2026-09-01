export interface RateLimiterPort {
  check(key: string, limit: number, windowSeconds: number) : Promise<void>;
}