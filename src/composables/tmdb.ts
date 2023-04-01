import { useFetch } from "./fetch";
import type { MediaType, PageResult, GenreResult, MediaDetails } from "@/types";

const baseUrl: string = "https://api.themoviedb.org/3/";
const TMDB_API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

function createUrl(endpoint: string, params: Record<string, any>): URL {
  const url = new URL(endpoint, baseUrl);
  const p = new URLSearchParams(params);
  url.search = p.toString();
  return url;
}

export function getPopularMedia(media: MediaType) {
  const url = createUrl(`${media}/popular`, { api_key: TMDB_API_KEY });
  return useFetch<PageResult>(url);
}
export function getTrendingMedia(
  media: MediaType | "all",
  time_window: "day" | "week"
) {
  const url = createUrl(`trending/${media}/${time_window}`, {
    api_key: TMDB_API_KEY,
  });
  return useFetch<PageResult>(url);
}

export function getMediaGenreList(media: MediaType) {
  const url = createUrl(`genre/${media}`, { api_key: TMDB_API_KEY });
  return useFetch<GenreResult>(url);
}

export function getMediaDetails(id: string, media: MediaType) {
  const url = createUrl(`${media}/${id}`, {
    api_key: TMDB_API_KEY,
    append_to_response:
      "videos,credits,aggregate_credits,images,external_ids,release_dates,recommendations,keywords",
  });
  return useFetch<MediaDetails>(url);
}
