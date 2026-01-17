import type { Memorial } from "./types";

const KEY = "farewell_museum.memorials.v1";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadMemorials(): Memorial[] {
  const data = safeParse<Memorial[]>(localStorage.getItem(KEY));
  return Array.isArray(data) ? data : [];
}

export function saveMemorials(items: Memorial[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function upsertMemorial(m: Memorial) {
  const items = loadMemorials();
  const idx = items.findIndex((x) => x.id === m.id);
  if (idx >= 0) items[idx] = m;
  else items.unshift(m);
  saveMemorials(items);
}

export function getMemorial(id: string): Memorial | undefined {
  return loadMemorials().find((m) => m.id === id);
}