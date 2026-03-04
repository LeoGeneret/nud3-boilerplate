export function useGetVar(query: string) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(query).trim()
}
