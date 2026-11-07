// the backend's address; comes from frontend-petal/.env, and is empty if there's no .env
const BASE = import.meta.env.VITE_API_URL || "";           // empty string means "use the Vite proxy", exactly like today

// one helper so every request in the app handles errors the same way
export async function api(path, options = {}) {            // path = the URL, options = method/body (empty if not given)
  const res = await fetch(`${BASE}${path}`, {              // BASE + path, e.g. http://localhost:5020 + /api/projects
    headers: { "Content-Type": "application/json" },       // tells Express the body is JSON, so express.json() can read it
    ...options,                                            // add method and body from whoever called this
  });
  const data = await res.json().catch(() => ({}));         // read the JSON reply; if there isn't any, use an empty object instead of crashing

  if (!res.ok) {                                           // res.ok is false for 400, 404, 500, etc.
    const details = data.details?.map((d) => d.message).join(", "); // your Zod validator sends a "details" list; join the messages into one string
    throw new Error(details || data.error || "Request failed");     // use the best message we have; callers catch this and show it
  }
  return data;                                             // success: hand the parsed JSON back
}