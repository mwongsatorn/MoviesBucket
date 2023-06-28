import { useFetch } from "./fetch";
import type {
  PageResult,
  ShortMovieDetails,
  MovieDetails,
  ShortSerieDetails,
  SerieDetails,
} from "@/types";

interface ShortDetailsDataMap {
  movie: PageResult<ShortMovieDetails>;
  tv: PageResult<ShortSerieDetails>;
}

interface ShortDetailsWithAll extends ShortDetailsDataMap {
  all: PageResult<ShortMovieDetails> | PageResult<ShortSerieDetails>;
}

interface DetailsDataMap {
  movie: MovieDetails;
  tv: SerieDetails;
}

const baseUrl: string = "https://api.themoviedb.org/3/";
const TMDB_API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

function createUrl(endpoint: string, params: Record<string, any>): URL {
  const url = new URL(endpoint, baseUrl);
  const p = new URLSearchParams(params);
  url.search = p.toString();
  return url;
}

export function getPopularMedia<MediaType extends keyof ShortDetailsDataMap>(
  media: MediaType,
  page: number = 1
) {
  const url = createUrl(`${media}/popular`, {
    api_key: TMDB_API_KEY,
    language: "en",
    page,
  });
  return useFetch<ShortDetailsDataMap[MediaType]>(url);
}

export function getTopRatedMedia<MediaType extends keyof ShortDetailsDataMap>(
  media: MediaType,
  page: number = 1
) {
  const url = createUrl(`${media}/top_rated`, {
    api_key: TMDB_API_KEY,
    language: "en",
    page,
  });
  return useFetch<ShortDetailsDataMap[MediaType]>(url);
}

export function getTrendingMedia<MediaType extends keyof ShortDetailsWithAll>(
  media: MediaType,
  time_window: "day" | "week",
  page: number = 1
) {
  const url = createUrl(`trending/${media}/${time_window}`, {
    api_key: TMDB_API_KEY,
    language: "en",
    page,
  });
  return useFetch<ShortDetailsWithAll[MediaType]>(url);
}

export function getUpcomingMovies(page: number = 1) {
  const url = createUrl("movie/upcoming", {
    api_key: TMDB_API_KEY,
    language: "en",
    page,
  });
  return useFetch<PageResult<ShortMovieDetails>>(url);
}

export function getMediaDetails<MediaType extends keyof DetailsDataMap>(
  id: string,
  media: MediaType
) {
  const url = createUrl(`${media}/${id}`, {
    api_key: TMDB_API_KEY,
    language: "en",
    append_to_response:
      "videos,credits,aggregate_credits,images,external_ids,recommendations,keywords",
  });
  return useFetch<DetailsDataMap[MediaType]>(url);
}

export function getMediaByKeywordId<
  MediaType extends keyof ShortDetailsDataMap
>(media: MediaType, id: string, page: number) {
  const url = createUrl(`discover/${media}`, {
    api_key: TMDB_API_KEY,
    language: "en",
    with_keywords: id,
    page,
  });
  return useFetch<ShortDetailsDataMap[MediaType]>(url);
}

export function getKeywordDetails(id: string) {
  const url = createUrl(`keyword/${id}`, {
    api_key: TMDB_API_KEY,
    language: "en",
  });
  return useFetch<{ id: string; name: string }>(url);
}

export function getMediaByGenreId<MediaType extends keyof ShortDetailsDataMap>(
  media: MediaType,
  id: string,
  page: number
) {
  const url = createUrl(`discover/${media}`, {
    api_key: TMDB_API_KEY,
    language: "en",
    with_genres: id,
    page,
  });
  return useFetch<ShortDetailsDataMap[MediaType]>(url);
}
