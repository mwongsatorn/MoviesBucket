import { useFetch } from "./fetch";
import type {
  PageResult,
  ShortMovie,
  Movie,
  ShortSerie,
  Serie,
  ShortPerson,
  Person,
} from "@/types";

interface ShortDetailsDataMap {
  movie: PageResult<ShortMovie>;
  tv: PageResult<ShortSerie>;
}

interface SearchDataMap extends ShortDetailsDataMap {
  person: PageResult<ShortPerson>;
}

interface ShortDetailsWithAll extends ShortDetailsDataMap {
  all: PageResult<ShortMovie> | PageResult<ShortSerie>;
}

interface DetailsDataMap {
  movie: Movie;
  tv: Serie;
}

const baseUrl: string = "https://api.themoviedb.org/3/";

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
    language: "en",
    page,
  });
  return useFetch<ShortDetailsWithAll[MediaType]>(url);
}

export function getUpcomingMovies(page: number = 1) {
  const url = createUrl("movie/upcoming", {
    language: "en",
    page,
  });
  return useFetch<PageResult<ShortMovie>>(url);
}

export function getMediaDetails<MediaType extends keyof DetailsDataMap>(
  id: string,
  media: MediaType
) {
  const url = createUrl(`${media}/${id}`, {
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
    language: "en",
    with_keywords: id,
    page,
  });
  return useFetch<ShortDetailsDataMap[MediaType]>(url);
}

export function getKeywordDetails(id: string) {
  const url = createUrl(`keyword/${id}`, {
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
    language: "en",
    with_genres: id,
    page,
  });
  return useFetch<ShortDetailsDataMap[MediaType]>(url);
}

export function getMediaGenreList(media: string) {
  const url = createUrl(`genre/${media}/list`, {
    language: "en",
  });
  return useFetch<{ genres: [{ id: string; name: string }] }>(url);
}

export function getPersonDetails(id: string) {
  const url = createUrl(`person/${id}`, {
    language: "en",
    append_to_response: "external_ids,images,combined_credits",
  });
  return useFetch<Person>(url);
}

export function searchQuery<SearchType extends keyof SearchDataMap>(
  query: string,
  type: SearchType,
  page: number = 1
) {
  const url = createUrl(`search/${type}`, {
    language: "en",
    query,
    page,
  });
  return useFetch<SearchDataMap[SearchType]>(url);
}
