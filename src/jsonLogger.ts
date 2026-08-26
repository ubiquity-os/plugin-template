/**
 * UbiquityOS - structured-json-logger
 */
export function logJson(level: string, msg: string, meta: any = {}) { return JSON.stringify({ ts: Date.now(), level, msg, meta }); }
