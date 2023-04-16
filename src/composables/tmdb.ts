import { useFetch } from "./fetch";
import type {
  PageResult,
  ShortMovieDetails,
  MovieDetails,
  ShortSerieDetails,
  SerieDetails,
} from "@/types";

interface PopularMediaDataMap {
  movie: PageResult<ShortMovieDetails>;
  tv: PageResult<ShortSerieDetails>;
}

interface TrendingMediaDataMap {
  movie: PageResult<ShortMovieDetails>;
  tv: PageResult<ShortSerieDetails>;
  all: PageResult<ShortMovieDetails> | PageResult<ShortSerieDetails>;
}

interface MediaDetailDataMap {
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

export function getPopularMedia<MediaType extends keyof PopularMediaDataMap>(
  media: MediaType
) {
  const url = createUrl(`${media}/popular`, {
    api_key: TMDB_API_KEY,
    language: "en",
  });
  return useFetch<PopularMediaDataMap[MediaType]>(url);
}

export function getTrendingMedia<MediaType extends keyof TrendingMediaDataMap>(
  media: MediaType,
  time_window: "day" | "week"
) {
  const url = createUrl(`trending/${media}/${time_window}`, {
    api_key: TMDB_API_KEY,
    language: "en",
  });
  return useFetch<TrendingMediaDataMap[MediaType]>(url);
}

export function getMediaDetails<MediaType extends keyof MediaDetailDataMap>(
  id: string,
  media: MediaType
) {
  const url = createUrl(`${media}/${id}`, {
    api_key: TMDB_API_KEY,
    language: "en",
    append_to_response:
      "videos,credits,aggregate_credits,images,external_ids,recommendations,keywords",
  });
  return useFetch<MediaDetailDataMap[MediaType]>(url);
}
