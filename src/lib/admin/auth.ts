const TOKEN_KEY = "admin_access_token";
const ADMIN_KEY = "admin_user";

export function saveAdminAuth(token: string, admin?: unknown) {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);

  if (admin) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  }
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser<T = unknown>(): T | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function removeAdminAuth() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}