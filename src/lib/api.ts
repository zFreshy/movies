export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) || '/api'

export function getUserId(): string {
  try {
    const key = 'flixo_user_id'
    let id = localStorage.getItem(key)
    if (!id) {
      const gen = (globalThis.crypto && 'randomUUID' in globalThis.crypto)
        ? (globalThis.crypto as any).randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36)
      localStorage.setItem(key, gen)
      id = gen
    }
    return id
  } catch {
    // Fallback in non-browser contexts
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
  }
}