import { MovieItem } from "@/types/movies";

const TMDB_BASE = "https://api.themoviedb.org/3";

interface TMDBResponse<T> {
  results: T[];
}

function buildHeaders() {
  const headers: Record<string, string> = { Accept: "application/json" };
  const bearer =
    process.env.EXPO_PUBLIC_TMDB_READ_TOKEN ||
    process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN; // allow both naming
  if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
  return headers;
}

function withApiKey(url: string) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  if (
    apiKey &&
    !process.env.EXPO_PUBLIC_TMDB_READ_TOKEN &&
    !process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN
  ) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}api_key=${apiKey}`;
  }
  return url;
}

export async function getTrendingMovies(
  language: string = "en-US"
): Promise<MovieItem[]> {
  const endpoint = withApiKey(
    `${TMDB_BASE}/trending/movie/day?language=${language}`
  );
  const res = await fetch(endpoint, { headers: buildHeaders() });
  if (!res.ok) {
    throw new Error(`TMDb error ${res.status}`);
  }
  const json: TMDBResponse<MovieItem> = await res.json();
  return json.results || [];
}

export function credentialsPresent(): boolean {
  return Boolean(
    process.env.EXPO_PUBLIC_TMDB_READ_TOKEN ||
      process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN ||
      process.env.EXPO_PUBLIC_TMDB_API_KEY
  );
}

export async function getMovieDetails(
  id: number,
  language: string = "en-US"
): Promise<MovieItem> {
  const endpoint = withApiKey(`${TMDB_BASE}/movie/${id}?language=${language}`);
  const res = await fetch(endpoint, { headers: buildHeaders() });
  if (!res.ok) throw new Error(`TMDb detail error ${res.status}`);
  return await res.json();
}
