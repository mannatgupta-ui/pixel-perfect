/**
 * Convert planetocentric latitude / east-positive longitude (degrees) into a
 * position on a sphere, matching three.js SphereGeometry UVs for an
 * equirectangular map whose left edge is -180° and centre is 0°.
 */
export function latLonToVector(lat: number, lon: number, radius = 1): [number, number, number] {
  const latR = (lat * Math.PI) / 180;
  const phi = ((lon + 180) * Math.PI) / 180;
  const x = -Math.cos(phi) * Math.cos(latR) * radius;
  const y = Math.sin(latR) * radius;
  const z = Math.sin(phi) * Math.cos(latR) * radius;
  return [x, y, z];
}

/** Human-readable coordinates, e.g. "14.57° S, 175.47° E". */
export function formatCoords(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns}, ${Math.abs(lon).toFixed(2)}° ${ew}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Deterministic (SSR-safe) date formatting from an ISO yyyy-mm-dd string. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y) return iso;
  if (!m) return String(y);
  const month = MONTHS[m - 1] ?? "";
  return d ? `${d} ${month} ${y}` : `${month} ${y}`;
}
