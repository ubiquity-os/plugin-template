/**
 * UbiquityOS - cors-response-helper
 */
export function getCorsHeaders(origin: string = "*") { return { "Access-Control-Allow-Origin": origin }; }
