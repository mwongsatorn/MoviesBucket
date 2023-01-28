import { useFetch } from "./fetch";
import type { MediaType, PageResult, GenreResult, MediaDetail } from "@/types";

const baseUrl = "https://api.themoviedb.org/3/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function getPopularMedia(media: MediaType) {
  const { data, response, isLoading, error } = useFetch<PageResult>(
    `${baseUrl}/${media}/popular?api_key=${TMDB_API_KEY}`
  );
  return { data, response, isLoading, error };
}
export function getTrendingMedia(
  media: MediaType | "all",
  time_window: "day" | "week"
) {
  const { data, response, isLoading, error } = useFetch<PageResult>(
    `${baseUrl}/trending/${media}/${time_window}?api_key=${TMDB_API_KEY}`
  );
  return { data, response, isLoading, error };
}

export function getMediaGenre(media: MediaType) {
  const { data, response, isLoading, error } = useFetch<GenreResult>(
    `${baseUrl}/genre/${media}?api_key=${TMDB_API_KEY}`
  );
  return { data, response, isLoading, error };
}

export function getMovieDetail(id: string) {
  const { data, response, isLoading, error } = useFetch<MediaDetail>(
    `${baseUrl}/movie/${id}/?api_key=${TMDB_API_KEY}`
  );
  return { data, response, isLoading, error };
}

export function getSerieDetail(id: string) {
  const { data, response, isLoading, error } = useFetch<MediaDetail>(
    `${baseUrl}/tv/${id}/?api_key=${TMDB_API_KEY}`
  );
  return { data, response, isLoading, error };
}
