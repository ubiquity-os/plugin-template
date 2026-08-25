/**
 * UbiquityOS - Deterministic Coverage Badge Renderer
 */
export function generateCoverageBadgeSvg(percentage: number): string {
  const color = percentage >= 90 ? '#4c1' : percentage >= 75 ? '#dfb317' : '#e05d44';
  const label = 'coverage';
  const val = `${percentage.toFixed(1)}%`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="104" height="20">
  <linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <mask id="a"><rect width="104" height="20" rx="3" fill="#fff"/></mask>
  <g mask="url(#a)">
    <path fill="#555" d="M0 0h61v20H0z"/>
    <path fill="${color}" d="M61 0h43v20H61z"/>
    <path fill="url(#b)" d="M0 0h104v20H0z"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="30.5" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="30.5" y="14">${label}</text>
    <text x="81.5" y="15" fill="#010101" fill-opacity=".3">${val}</text>
    <text x="81.5" y="14">${val}</text>
  </g>
</svg>`;
}
