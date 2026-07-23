export function getUrlParameterByName(
  name: string,
  url: string = window.location.href
): string | null {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.searchParams.get(name) // returns string or null automatically
  } catch {
    return null // invalid URL
  }
}

export function imgSrc(path: string): string {
  return `${import.meta.env.VITE_BASE_PATH_URL}${path}` 
}
