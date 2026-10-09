export interface RateLimiterPort {
  check(key: string, limit: number, windowSeconds: number, personalizedMessage?: string) : Promise<void>;
}