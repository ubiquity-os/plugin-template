/**
 * UbiquityOS - env-schema-validator
 */
export function validateEnv(keys: string[], env: Record<string, any>): boolean { return keys.every(k => !!env[k]); }
