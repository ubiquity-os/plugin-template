/**
 * UbiquityOS - Deno 2.0 Runtime Import Compatibility Guard
 */
export function validateDenoImports(sourceCode: string): { compliant: boolean; nonEsmImports: string[] } {
  const requireMatches = sourceCode.match(/require(['"][^'"]+['"])/g) || [];
  return {
    compliant: requireMatches.length === 0,
    nonEsmImports: requireMatches
  };
}
