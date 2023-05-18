import type { ShortMovieDetails, ShortSerieDetails } from "@/types";

function mediaReleaseYear(date: string) {
  return date.split("-", 1)[0];
}

export function mediaDisplayProps(
  media: ShortMovieDetails | ShortSerieDetails
) {
  return {
    id: media.id,
    title: "title" in media ? media.title : media.name,
    overview: media.overview,
    releaseYear:
      "release_date" in media
        ? mediaReleaseYear(media.release_date)
        : mediaReleaseYear(media.first_air_date),
    backdropPath: media.backdrop_path,
    mediaType: "title" in media ? "movies" : "series",
  };
}

export function mediaCardProps(media: ShortMovieDetails | ShortSerieDetails) {
  return {
    id: media.id,
    title: "title" in media ? media.title : media.name,
    voteAverage: media.vote_average,
    releaseDate:
      "release_date" in media ? media.release_date : media.first_air_date,
    posterPath: media.poster_path,
    mediaType: "title" in media ? "movies" : "series",
  };
}
