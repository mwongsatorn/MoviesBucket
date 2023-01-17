<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import SearchBar from "./SearchBar.vue";

const isSearchbarExpaned = ref(false);
</script>

<template>
  <header class="shadow-md">
    <div class="mx-auto flex h-[56px] max-w-7xl items-center px-4">
      <div class="flex shrink-0 items-center space-x-8">
        <RouterLink :class="isSearchbarExpaned ? 'hidden' : ''" to="/">
          <img class="" src="../assets/moviesbucket-logo.svg" alt="" />
        </RouterLink>
        <nav class="ml-auto hidden space-x-4 font-bold sm:flex">
          <RouterLink to="/movies">Movies</RouterLink>
          <RouterLink to="/series">Series</RouterLink>
        </nav>
      </div>
      <SearchBar
        @close-searchbar="isSearchbarExpaned = false"
        @expand-searchbar="isSearchbarExpaned = true"
      />
    </div>
  </header>
</template>
