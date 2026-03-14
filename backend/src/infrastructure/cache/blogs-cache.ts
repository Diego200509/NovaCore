/**
 * Caché en memoria para GET /blogs.
 * Reduce consultas a la DB y hace que las respuestas se vean mucho más rápidas
 * (sobre todo después de un cold start en Render).
 * TTL 3 minutos; se invalida en create/update/delete.
 */

const TTL_MS = 3 * 60 * 1000; // 3 minutos

let cached: { data: unknown[]; expiresAt: number } | null = null;

export function getBlogsFromCache(): unknown[] | null {
  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    cached = null;
    return null;
  }
  return cached.data;
}

export function setBlogsCache(data: unknown[]): void {
  cached = { data, expiresAt: Date.now() + TTL_MS };
}

export function invalidateBlogsCache(): void {
  cached = null;
}
