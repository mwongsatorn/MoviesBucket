import { useFetch } from "./fetch";
import type { MediaType, PageResult, GenreResult, MediaDetails } from "@/types";

const baseUrl: string = "https://api.themoviedb.org/3/";
const TMDB_API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

export function getPopularMedia(media: MediaType) {
  const url = new URL(`${media}/popular`, baseUrl);
  const params = new URLSearchParams({ api_key: TMDB_API_KEY });
  url.search = params.toString();
  return useFetch<PageResult>(url);
}
export function getTrendingMedia(
  media: MediaType | "all",
  time_window: "day" | "week"
) {
  const url = new URL(`trending/${media}/${time_window}`, baseUrl);
  const params = new URLSearchParams({ api_key: TMDB_API_KEY });
  url.search = params.toString();
  return useFetch<PageResult>(url);
}

export function getMediaGenreList(media: MediaType) {
  const url = new URL(`genre/${media}`, baseUrl);
  const params = new URLSearchParams({ api_key: TMDB_API_KEY });
  url.search = params.toString();
  return useFetch<GenreResult>(url);
}

export function getMediaDetails(id: string, media: MediaType) {
  const url = new URL(`${media}/${id}`, baseUrl);
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    append_to_response:
      "videos,credits,aggregate_credits,images,external_ids,release_dates,recommendations",
  });
  url.search = params.toString();
  return useFetch<MediaDetails>(url);
}
