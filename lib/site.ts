/**
 * Canonical site URL for metadata, sitemap, robots, and JSON-LD.
 *
 * NEXT_PUBLIC_SITE_URL may override this value for previews or alternate
 * environments. The production fallback is Forge's canonical hostname.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://forge.masterengine.ai"
).replace(/\/$/, "");

export const SITE_NAME = "Forge";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
