/**
 * Canonical site URL for metadata, sitemap, robots, and JSON-LD.
 *
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://forge.ameti.one).
 * The fallback below is a placeholder and MUST be replaced with the real
 * production domain before launch, otherwise canonical URLs and the
 * sitemap will point at the wrong host.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://forge.ameti.one"
).replace(/\/$/, "");

export const SITE_NAME = "Forge";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
