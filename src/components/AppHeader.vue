<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SearchBar from "./SearchBar.vue";

const isSearchbarExpaned = ref(false);
const isScrolled = ref(false);
const route = useRoute();

const isSpecificPages = computed(() => {
  const specificPages = ["Home", "Movies", "MovieDetails", "SerieDetails"];
  return specificPages.includes(route.name as string);
});

function handleScroll() {
  if (window.scrollY > 0) isScrolled.value = true;
  else isScrolled.value = false;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="top-0 z-50 w-full transition duration-300"
    :class="[
      isScrolled || !isSpecificPages ? 'bg-white shadow-lg' : '',
      isSpecificPages ? 'fixed' : 'sticky',
    ]"
  >
    <div class="mx-auto flex h-[56px] max-w-7xl items-center px-4">
      <div class="flex shrink-0 items-center space-x-8">
        <RouterLink :class="isSearchbarExpaned ? 'hidden' : ''" to="/">
          <img class="" src="../assets/moviesbucket-logo.svg" alt="" />
        </RouterLink>
        <nav
          class="ml-auto hidden space-x-4 font-bold sm:flex"
          :class="[isScrolled || !isSpecificPages ? '' : 'text-white']"
        >
          <RouterLink to="/movies">Movies</RouterLink>
          <RouterLink to="/series">Series</RouterLink>
        </nav>
      </div>
      <SearchBar
        :is-specific-pages="isSpecificPages"
        :is-scrolled="isScrolled"
        @close-searchbar="isSearchbarExpaned = false"
        @expand-searchbar="isSearchbarExpaned = true"
      />
    </div>
  </header>
</template>
