// Admin mode is hidden from recruiters by design.
// It unlocks ONLY when one of the following opts in:
//   1. Build-time flag:     VITE_MAHI_ADMIN=true
//   2. URL query parameter: ?mahiAdmin=1
//   3. LocalStorage flag:   localStorage["mahi:admin:enabled"] = "1"
//
// The URL flag persists to localStorage so a reload keeps the panel unlocked
// on the same machine, but a fresh visitor never sees it.

const STORAGE_KEY = "mahi:admin:enabled";
const QUERY_KEY = "mahiAdmin";

export interface AdminAccessConfig {
  storageKey: string;
  queryKey: string;
  buildFlag: boolean;
}

export const adminAccessConfig: AdminAccessConfig = {
  storageKey: STORAGE_KEY,
  queryKey: QUERY_KEY,
  buildFlag:
    typeof import.meta !== "undefined" &&
    typeof import.meta.env !== "undefined" &&
    String(import.meta.env.VITE_MAHI_ADMIN ?? "").toLowerCase() === "true",
};

export function isAdminEnabled(): boolean {
  if (adminAccessConfig.buildFlag) return true;
  if (typeof window === "undefined") return false;

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get(QUERY_KEY) === "1") {
      window.localStorage.setItem(STORAGE_KEY, "1");
      return true;
    }
    if (params.get(QUERY_KEY) === "0") {
      window.localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function disableAdmin(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
