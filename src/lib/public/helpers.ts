export function extractData<T>(response: any): T {
    return response?.data?.data ?? response?.data ?? response;
  }
  
  export function extractArray<T>(response: any): T[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.data?.data)) return response.data.data;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.results)) return response.results;
    return [];
  }
  
  export function getFileUrl(path?: string | null) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
  
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    return `${baseUrl}${path}`;
  }