// Vercel rewrites every request to /api/index.js, so req.url never contains
// the path the client actually asked for. vercel.json carries the original
// path through in the __bk_path query param; rebuild the real URL from it.
export function originalRequestUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || (req.socket && !req.socket.encrypted ? 'http' : 'https');
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url, `${proto}://${host}`);
  const originalPath = url.searchParams.get('__bk_path');
  if (originalPath) {
    url.searchParams.delete('__bk_path');
    url.pathname = originalPath;
  }
  return url;
}
