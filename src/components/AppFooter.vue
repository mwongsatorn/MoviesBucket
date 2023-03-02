<script setup lang="ts">
import IconGithub from "./Icons/IconGithub.vue";
</script>

<template>
  <footer class="mt-auto bg-gradient-to-r from-rose-800 to-amber-500">
    <div
      class="mx-auto flex max-w-7xl items-center gap-x-6 gap-y-4 px-4 py-4 text-sm text-white"
    >
      <div class="flex flex-wrap items-center gap-x-2 gap-y-2">
        <a href="https://www.themoviedb.org/" target="_blank">
          <img class="h-5" src="/TMDb-logo.svg" alt="" />
        </a>
        <div>Data is provided by The Movie Database (TMDb)</div>
      </div>

      <a
        class="ml-auto flex items-center gap-x-2"
        href="https://github.com/mwongsatorn/mediabucket"
        target="_blank"
      >
        <IconGithub class="h-8 w-8"></IconGithub>
        <span>Github</span>
      </a>
    </div>
  </footer>
</template>
