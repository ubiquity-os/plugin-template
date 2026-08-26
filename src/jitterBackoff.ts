/**
 * UbiquityOS - exponential-backoff-jitter
 */
export function getBackoffMs(attempt: number, baseMs: number = 100): number { return Math.random() * (baseMs * (2 ** attempt)); }
