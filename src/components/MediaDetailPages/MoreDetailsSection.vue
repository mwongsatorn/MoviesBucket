<script setup lang="ts">
import { computed } from "vue";
import IconLink from "@/components/Icons/IconLink.vue";
import IconImdb from "@/components/Icons/IconImdb.vue";
import IconFacebook from "@/components/Icons/IconFacebook.vue";
import IconTwitter from "@/components/Icons/IconTwitter.vue";
import IconInstagram from "@/components/Icons/IconInstagram.vue";
import type { MovieExternalIds, SerieAndPersonExternalIds } from "@/types";

interface Props {
  homepage: string | undefined;
  status: string | undefined;
  original_language: string | undefined;
  budget: string | null;
  revenue: string | null;
  external_ids: MovieExternalIds | SerieAndPersonExternalIds | undefined;
  keywords:
    | [
        {
          id: string;
          name: string;
        }
      ]
    | null;
}

const props = defineProps<Props>();

const hasExternalIds = computed(() => {
  if (!props.external_ids) return null;
  return (
    props.external_ids.facebook_id !== null ||
    props.external_ids.instagram_id !== null ||
    props.external_ids.twitter_id !== null ||
    props.external_ids.imdb_id !== null
  );
});

const langCodeFormat = new Intl.DisplayNames("en-us", {
  type: "language",
});

const mediaOriginalLang = computed(() => {
  if (!props.original_language) return null;
  return langCodeFormat.of(props.original_language);
});

const hasKeywords = computed(() => {
  if (!props.keywords) return null;
  return props.keywords.length > 0;
});
</script>

<template>
  <aside
    id="more-details"
    class="flex flex-wrap gap-y-4 bg-gray-50 px-4 py-4 md:flex-col"
  >
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Homepage</h2>
      <a
        v-if="props.homepage"
        :href="props.homepage"
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
          v-if="props.external_ids?.imdb_id"
          :href="`https://www.imdb.com/title/${props.external_ids.imdb_id}`"
          target="_blank"
        >
          <IconImdb class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
        <a
          v-if="props.external_ids?.facebook_id"
          :href="`https://www.facebook.com/${props.external_ids.facebook_id}`"
          target="_blank"
        >
          <IconFacebook class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
        <a
          v-if="props.external_ids?.twitter_id"
          :href="`https://twitter.com/${props.external_ids.twitter_id}`"
          target="_blank"
        >
          <IconTwitter class="h-6 w-6 duration-300 hover:text-rose-800" />
        </a>
        <a
          v-if="props.external_ids?.instagram_id"
          :href="`https://www.instagram.com/${props.external_ids.instagram_id}`"
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
      <p v-if="props.status" class="text-sm italic">
        {{ props.status }}
      </p>
      <p class="text-sm italic" v-else>No information</p>
    </div>
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Budget</h2>
      <p v-if="props.budget" class="text-sm italic">{{ props.budget }}</p>
      <p class="text-sm italic" v-else>No information</p>
    </div>
    <div class="w-1/2 space-y-2 sm:w-1/3 md:w-full">
      <h2 class="font-bold">Revenue</h2>
      <p v-if="props.revenue" class="text-sm italic">{{ props.revenue }}</p>
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
          v-for="keyword in props.keywords"
          :key="keyword.id"
          :to="`/keywords/${keyword.id}`"
        >
          {{ keyword.name }}
        </RouterLink>
      </div>
      <p class="text-sm italic" v-else>No keywords</p>
    </div>
  </aside>
</template>
