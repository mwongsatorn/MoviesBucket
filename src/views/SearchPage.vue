<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchQuery } from "@/composables/tmdb";
import type {
  ShortMovieDetails,
  ShortPersonDetails,
  ShortSerieDetails,
  PageResult,
} from "@/types";
import CardGrid from "@/components/CardGrid.vue";
import MediaCard from "@/components/MediaCard.vue";
import PersonCard from "@/components/PersonCard.vue";

interface FirstPage {
  movies: PageResult<ShortMovieDetails>;
  series: PageResult<ShortSerieDetails>;
  people: PageResult<ShortPersonDetails>;
}

type Card = ShortMovieDetails | ShortSerieDetails | ShortPersonDetails;
type SearchType = "movies" | "series" | "people";
const route = useRoute();
const router = useRouter();
const props = defineProps<{ searchType: SearchType }>();

const searchType = props.searchType || "movies";

const cards = ref<Card[]>([]);
const type = {
  movies: "movie",
  series: "tv",
  people: "person",
} as const;

function cardComponent() {
  return searchType === "movies" || searchType === "series"
    ? MediaCard
    : PersonCard;
}

function cardProps<T>(card: T) {
  return searchType === "movies" || searchType === "series"
    ? { media: card, type: searchType }
    : { person: card };
}

let query = route.query.query as string;
let page = Number(route.query.page as unknown as number) || 1;
let firstPage: FirstPage;

const firstPageSession = sessionStorage.getItem("firstPage");
firstPage = firstPageSession ? JSON.parse(firstPageSession) : null;
const oldQuery = sessionStorage.getItem("query");

if (!firstPage || query !== oldQuery) {
  const [{ data: movies }, { data: series }, { data: people }] =
    await Promise.all([
      searchQuery(query, "movie"),
      searchQuery(query, "tv"),
      searchQuery(query, "person"),
    ]);
  firstPage = {
    movies: movies.value!,
    series: series.value!,
    people: people.value!,
  };
  sessionStorage.setItem("firstPage", JSON.stringify(firstPage));
  sessionStorage.setItem("query", query);
}

if (page === 1) {
  console.log(firstPage);
  cards.value = firstPage[searchType].results;
} else {
  const { data } = await searchQuery(query, type[searchType], page);
  cards.value = data.value!.results;
}

function previousPage() {
  page--;
  router.push({
    name: "Search",
    params: {
      searchType: searchType,
    },
    query: { query: query, page: page },
  });
}
function nextPage() {
  page++;
  router.push({
    name: "Search",
    params: {
      searchType: searchType,
    },
    query: { query: query, page: page },
  });
}
</script>

<template>
  <main>
    <section
      id="media-by-keyword"
      class="relative mx-auto my-8 max-w-7xl px-4 @container"
    >
      <h1 class="text-xl font-bold sm:text-2xl">
        Search query: "{{ route.query.query }}"
      </h1>
      <div class="mt-2 flex flex-wrap items-center gap-y-2">
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <RouterLink
            class="grow rounded-lg bg-rose-800 px-2 py-1 text-sm font-bold capitalize text-white hover:bg-amber-500"
            v-for="(_, key, index) in type"
            :key="index"
            :to="{
              name: 'Search',
              params: { searchType: key },
              query: { query, page: 1 },
            }"
          >
            {{ key }}: {{ firstPage[key].total_results }}
          </RouterLink>
        </div>
        <div class="ml-auto">
          <button
            :disabled="page === 1"
            @click="previousPage()"
            class="bg-rose-800 px-2.5 py-1 text-white disabled:bg-gray-200"
          >
            &lt;
          </button>
          <span class="px-2">
            {{ page }} / {{ firstPage[searchType].total_pages }}
          </span>
          <button
            :disabled="page === firstPage[searchType].total_pages"
            @click="nextPage()"
            class="bg-rose-800 px-2.5 py-1 text-white disabled:bg-gray-200"
          >
            &gt;
          </button>
        </div>
      </div>
      <CardGrid>
        <template #cards>
          <component
            :is="(cardComponent() as any)"
            v-for="(card, index) in cards"
            :key="index"
            v-bind="cardProps(card)"
          />
        </template>
      </CardGrid>
    </section>
  </main>
</template>
