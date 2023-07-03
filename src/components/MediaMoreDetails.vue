<script setup lang="ts">
import IconLink from "@/components/Icons/IconLink.vue";
import IconImdb from "@/components/Icons/IconImdb.vue";
import IconFacebook from "@/components/Icons/IconFacebook.vue";
import IconTwitter from "@/components/Icons/IconTwitter.vue";
import IconInstagram from "@/components/Icons/IconInstagram.vue";
import type { MovieDetails, SerieDetails } from "@/types";

interface Props {
  media: MovieDetails | SerieDetails;
  type: "movies" | "series";
}

const props = defineProps<Props>();

function revenue() {
  const moneyFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });
  return "revenue" in props.media
    ? moneyFormat.format(props.media.revenue)
    : null;
}

function originalLanguage() {
  if (!props.media.original_language) return null;
  const langCodeFormat = new Intl.DisplayNames("en-us", {
    type: "language",
  });
  return langCodeFormat.of(props.media.original_language);
}

function hasExternalIds() {
  if (!props.media.external_ids) return null;
  return (
    props.media.external_ids.facebook_id !== null ||
    props.media.external_ids.instagram_id !== null ||
    props.media.external_ids.twitter_id !== null ||
    props.media.external_ids.imdb_id !== null
  );
}

const keywords =
  "keywords" in props.media.keywords
    ? props.media.keywords.keywords
    : props.media.keywords.results;

function hasKeywords() {
  if (!keywords) return null;
  return keywords.length > 0;
}
</script>

<template>
  <aside
    id="more-details"
    class="flex flex-wrap gap-y-4 bg-gray-50 px-4 py-4 md:flex-col"
  >
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Homepage</h2>
      <a
        v-if="props.media.homepage"
        :href="props.media.homepage"
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
        v-if="hasExternalIds()"
        class="flex flex-wrap items-center gap-x-4 gap-y-4"
      >
        <a
          v-if="props.media.external_ids?.imdb_id"
          :href="`https://www.imdb.com/title/${props.media.external_ids.imdb_id}`"
          target="_blank"
        >
          <IconImdb class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
        <a
          v-if="props.media.external_ids?.facebook_id"
          :href="`https://www.facebook.com/${props.media.external_ids.facebook_id}`"
          target="_blank"
        >
          <IconFacebook class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
        <a
          v-if="props.media.external_ids?.twitter_id"
          :href="`https://twitter.com/${props.media.external_ids.twitter_id}`"
          target="_blank"
        >
          <IconTwitter class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
        <a
          v-if="props.media.external_ids?.instagram_id"
          :href="`https://www.instagram.com/${props.media.external_ids.instagram_id}`"
          target="_blank"
        >
          <IconInstagram class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
      </div>
      <p class="text-sm italic" v-else>No external sources</p>
    </div>
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Original Language</h2>
      <p v-if="props.media.original_language" class="text-sm italic">
        {{ originalLanguage() }}
      </p>
      <p class="text-sm italic" v-else>No information</p>
    </div>
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Status</h2>
      <p v-if="props.media.status" class="text-sm italic">
        {{ props.media.status }}
      </p>
      <p class="text-sm italic" v-else>No information</p>
    </div>
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Budget</h2>
      <p v-if="'budget' in props.media" class="text-sm italic">
        {{ props.media.budget }}
      </p>
      <p class="text-sm italic" v-else>No information</p>
    </div>
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Revenue</h2>
      <p v-if="'revenue' in props.media" class="text-sm italic">
        {{ revenue() }}
      </p>
      <p class="text-sm italic" v-else>No information</p>
    </div>
    <div class="space-y-2 md:w-full">
      <h2 class="font-bold">Keywords</h2>
      <div
        v-if="hasKeywords()"
        class="flex flex-wrap items-center gap-x-2 gap-y-2"
      >
        <RouterLink
          class="rounded-lg bg-rose-800 px-2 py-1 text-sm text-white hover:bg-amber-500"
          v-for="keyword in keywords"
          :key="keyword.id"
          :to="`/${props.type}/keywords/${keyword.id}`"
        >
          {{ keyword.name }}
        </RouterLink>
      </div>
      <p class="text-sm italic" v-else>No keywords</p>
    </div>
  </aside>
</template>
