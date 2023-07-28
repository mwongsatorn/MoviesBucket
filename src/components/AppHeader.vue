<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SearchBar from "./SearchBar.vue";

const isSearchbarOpened = ref(false);
const isScrolled = ref(false);
const route = useRoute();

const isSpecificPages = ref<boolean>(false);
const specificPages = ["Home", "MediaList", "MediaDetails"];

watchEffect(() => {
  if (specificPages.includes(route.name as string)) {
    setTimeout(() => {
      isSpecificPages.value = true;
    }, 300);
  } else {
    isSpecificPages.value = false;
  }
});

function handleScroll() {
  if (window.scrollY > 0) isScrolled.value = true;
  else isScrolled.value = false;
}

function toggleSearchbar(isOpen: boolean) {
  isSearchbarOpened.value = isOpen;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  if (specificPages.includes(route.name as string))
    isSpecificPages.value = true;
  else isSpecificPages.value = false;
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
        <RouterLink :class="isSearchbarOpened ? 'hidden' : ''" to="/">
          <img src="../assets/mediabucket-logo.svg" alt="" />
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
        :toggle-searchbar="toggleSearchbar"
        :is-searchbar-opened="isSearchbarOpened"
      />
    </div>
  </header>
</template>
