<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getMediaDetails } from "../composables/tmdb";
import PersonCard from "@/components/PersonCard.vue";
import MediaCard from "@/components/MediaCard.vue";
import IconLink from "@/components/Icons/IconLink.vue";
import IconImdb from "@/components/Icons/IconImdb.vue";
import IconFacebook from "@/components/Icons/IconFacebook.vue";
import IconTwitter from "@/components/Icons/IconTwitter.vue";
import IconInstagram from "@/components/Icons/IconInstagram.vue";

const route = useRoute();

const mediaType = route.name === "MovieDetails" ? "movie" : "tv";
const mediaEndpointType = route.name === "MovieDetails" ? "movies" : "series";

const { data: mediaDetails } = await getMediaDetails(
  route.params.id as string,
  mediaType
);

const mediaRecommendationList = computed(() => {
  return mediaDetails.value?.recommendations?.results.slice(0, 7);
});

const mediaRuntime = computed(() => {
  if (!mediaDetails.value) return null;
  if (!("runtime" in mediaDetails.value)) return null;
  if (mediaDetails.value.runtime === null) return null;
  const hrs = Math.floor(mediaDetails.value.runtime / 60).toString();
  const mins = (mediaDetails.value.runtime % 60).toString();
  return `${hrs}hr${mins}min`;
});

const mediaReleaseDate = computed(() => {
  if (!mediaDetails.value) return null;
  return "release_date" in mediaDetails.value
    ? mediaDetails.value.release_date
    : mediaDetails.value.first_air_date;
});

const mediaReleaseYear = computed(() => {
  return mediaReleaseDate.value?.split("-")[0];
});

const mediaTitle = computed(() => {
  if (!mediaDetails.value) return null;
  return "title" in mediaDetails.value
    ? mediaDetails.value.title
    : mediaDetails.value.name;
});

const mediaKeywords = computed(() => {
  if (!mediaDetails.value) return null;
  return "keywords" in mediaDetails.value.keywords
    ? mediaDetails.value.keywords.keywords
    : mediaDetails.value.keywords.results;
});

const hasExternalIds = computed(() => {
  if (!mediaDetails.value) return null;
  return (
    mediaDetails.value.external_ids.facebook_id !== null ||
    mediaDetails.value.external_ids.instagram_id !== null ||
    mediaDetails.value.external_ids.twitter_id !== null ||
    mediaDetails.value.external_ids.imdb_id !== null
  );
});

const hasKeywords = computed(() => {
  if (!mediaDetails.value || !mediaKeywords.value) return null;
  return mediaKeywords.value.length > 0;
});

const moneyFormat = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const mediaBudget = computed(() => {
  if (!mediaDetails.value) return null;
  return "budget" in mediaDetails.value
    ? moneyFormat.format(mediaDetails.value.budget)
    : null;
});

const mediaRevenue = computed(() => {
  if (!mediaDetails.value) return null;
  return "revenue" in mediaDetails.value
    ? moneyFormat.format(mediaDetails.value.revenue)
    : null;
});

const langCodeFormat = new Intl.DisplayNames("en-us", {
  type: "language",
});

const mediaOriginalLang = computed(() => {
  if (!mediaDetails.value) return null;
  return langCodeFormat.of(mediaDetails.value.original_language);
});
</script>

<template>
  <main>
    <section
      id="overview"
      class="relative bg-cover bg-center"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${mediaDetails?.backdrop_path})`,
      }"
    >
      <div class="absolute top-0 h-full w-full bg-black/80" />
      <div
        class="relative mx-auto flex max-w-7xl flex-col space-y-4 px-4 pb-12 pt-[calc(56px+2rem)] sm:flex-row sm:space-x-8"
      >
        <div class="shrink-0 self-center">
          <img
            class="w-[250px] border-2"
            :src="`https://image.tmdb.org/t/p/w342/${mediaDetails?.poster_path}`"
            alt=""
          />
        </div>
        <div class="space-y-4 text-white">
          <h1 class="text-2xl font-bold">
            {{ mediaTitle }} ({{ mediaReleaseYear }})
          </h1>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-4 text-sm">
            <span>
              {{ mediaDetails?.vote_average }}/10 | {{ mediaReleaseDate }} |
              {{ mediaRuntime }}
            </span>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-4">
              <RouterLink
                class="rounded-lg bg-rose-800 px-2 py-1 hover:bg-amber-500"
                v-for="genre in mediaDetails?.genres"
                :key="genre.id"
                :to="`/genres/${genre.id}`"
              >
                {{ genre.name }}
              </RouterLink>
            </div>
          </div>
          <p class="italic text-white/50" v-if="mediaDetails?.tagline !== ''">
            {{ mediaDetails?.tagline }}
          </p>
          <div class="space-y-4">
            <h2 class="text-lg font-bold">Overview</h2>
            <p>{{ mediaDetails?.overview }}</p>
          </div>
        </div>
      </div>
    </section>
    <section
      id="details"
      class="mx-auto grid max-w-7xl md:grid-cols-[1fr_240px]"
    >
      <div class="overflow-hidden">
        <section id="cast" class="my-8 px-4">
          <h1 class="text-2xl font-bold">Cast</h1>
          <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
            <PersonCard
              v-for="person in mediaDetails?.credits?.cast"
              :key="person.id"
              :name="person.name"
              :id="person.id"
              :profile_path="person.profile_path"
              :character="person.character"
            />
          </div>
        </section>
        <section id="recommendation-media" class="my-8 overflow-hidden px-4">
          <h1 class="text-2xl font-bold">Recommendations</h1>
          <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
            <MediaCard
              v-for="media in mediaRecommendationList"
              :key="media.id"
              :id="media.id"
              :release_date="
                'release_date' in media
                  ? media.release_date
                  : media.first_air_date
              "
              :vote_average="media.vote_average"
              :media_type="mediaEndpointType"
              :poster_path="media.poster_path"
              :title="'title' in media ? media.title : media.name"
            />
          </div>
        </section>
      </div>
      <aside
        id="more-details"
        class="flex flex-wrap gap-y-4 bg-gray-50 px-4 py-4 md:flex-col"
      >
        <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
          <h2 class="font-bold">Homepage</h2>
          <a
            v-if="mediaDetails?.homepage"
            :href="mediaDetails.homepage"
            target="_blank"
            class="flex items-center gap-x-2 hover:underline hover:decoration-2"
          >
            <IconLink class="h-6 w-6" />
            <span class="text-sm">Visit homepage</span>
          </a>
          <p class="text-sm italic" v-else>No information</p>
        </div>
        <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
          <h2 class="font-bold">External sources</h2>
          <div
            v-if="hasExternalIds"
            class="flex flex-wrap items-center gap-x-4 gap-y-4"
          >
            <a
              v-if="mediaDetails?.external_ids?.imdb_id"
              :href="`https://www.imdb.com/title/${mediaDetails?.external_ids?.imdb_id}`"
              target="_blank"
            >
              <IconImdb class="h-6 w-6 duration-300 hover:text-rose-800" />
            </a>
            <a
              v-if="mediaDetails?.external_ids?.facebook_id"
              :href="`https://www.facebook.com/${mediaDetails?.external_ids?.facebook_id}`"
              target="_blank"
            >
              <IconFacebook class="h-6 w-6 duration-300 hover:text-rose-800" />
            </a>
            <a
              v-if="mediaDetails?.external_ids?.twitter_id"
              :href="`https://twitter.com/${mediaDetails?.external_ids?.twitter_id}`"
              target="_blank"
            >
              <IconTwitter class="h-6 w-6 duration-300 hover:text-rose-800" />
            </a>
            <a
              v-if="mediaDetails?.external_ids?.twitter_id"
              :href="`https://www.instagram.com/${mediaDetails?.external_ids?.instagram_id}`"
              target="_blank"
            >
              <IconInstagram class="h-6 w-6 duration-300 hover:text-rose-800" />
            </a>
          </div>
          <p class="text-sm italic" v-else>No external sources</p>
        </div>
        <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
          <h2 class="font-bold">Original Language</h2>
          <p v-if="mediaOriginalLang" class="text-sm italic">
            {{ mediaOriginalLang }}
          </p>
          <p class="text-sm italic" v-else>No information</p>
        </div>
        <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
          <h2 class="font-bold">Status</h2>
          <p v-if="mediaDetails?.status" class="text-sm italic">
            {{ mediaDetails?.status }}
          </p>
          <p class="text-sm italic" v-else>No information</p>
        </div>
        <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
          <h2 class="font-bold">Budget</h2>
          <p v-if="mediaBudget" class="text-sm italic">{{ mediaBudget }}</p>
          <p class="text-sm italic" v-else>No information</p>
        </div>
        <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
          <h2 class="font-bold">Revenue</h2>
          <p v-if="mediaRevenue" class="text-sm italic">{{ mediaRevenue }}</p>
          <p class="text-sm italic" v-else>No information</p>
        </div>
        <div class="space-y-2 md:w-full">
          <h2 class="font-bold">Keywords</h2>
          <div
            v-if="hasKeywords"
            class="flex flex-wrap items-center gap-x-2 gap-y-2"
          >
            <RouterLink
              class="rounded-lg bg-rose-800 px-2 py-1 text-sm text-white hover:bg-amber-500"
              v-for="keyword in mediaKeywords"
              :key="keyword.id"
              :to="`/keywords/${keyword.id}`"
            >
              {{ keyword.name }}
            </RouterLink>
          </div>
          <p class="text-sm italic" v-else>No keywords</p>
        </div>
      </aside>
    </section>
  </main>
</template>
