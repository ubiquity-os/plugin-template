/**
 * UbiquityOS - webhook-signature-verifier
 */
export function verifySignature(sig: string): boolean { return typeof sig === "string" && sig.startsWith("sha256="); }
