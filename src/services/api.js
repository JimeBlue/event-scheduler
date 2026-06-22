// One place that knows how to talk to the backend, so components stay clean.
// Solves three things: base URL in one spot, auto token header (FR018),
// and consistent error handling (FR019).

const BASE = import.meta.env.VITE_API_URL;

const request = async (path, options = {}) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Auto-attach the token if we have one — never forget it on a protected call.
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // One place to turn a failed response into a readable error.
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      // Auth endpoints report errors under `error` (e.g. "Invalid email or
      // password."); others use `message`. Check both so the UI gets the
      // real reason, not a generic fallback.
      message = data.error || data.message || message;
    } catch {
      // Response had no JSON body — keep the generic message.
    }
    // Attach the HTTP status so callers can show a friendly, status-specific
    // message (e.g. map 401/403 on login to "incorrect email or password").
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  // Some endpoints (e.g. DELETE) may return an empty body.
  if (res.status === 204) return null;
  return res.json();
};

export const api = {
  get: (p) => request(p),
  post: (p, body) => request(p, { method: 'POST', body: JSON.stringify(body) }),
  put: (p, body) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
  del: (p) => request(p, { method: 'DELETE' }),
};
