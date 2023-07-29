<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import IconsSearch from "./Icons/IconSearch.vue";
import IconCross from "./Icons/IconCross.vue";

interface Props {
  isSpecificPages: boolean;
  isScrolled: boolean;
  isSearchbarOpened: boolean;
  isMobileMenuOpened: boolean;
  toggleSearchbar: (isOpened: boolean) => void;
}
const props = defineProps<Props>();

const router = useRouter();

const input = ref("");

function handleResize() {
  if (window.innerWidth > 640) {
    props.toggleSearchbar(false);
  }
}

function search() {
  router.push({
    name: "Search",
    query: {
      query: input.value,
    },
  });
  input.value = "";
  props.toggleSearchbar(false);
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <form
    @submit.prevent="search()"
    class="w-full max-w-xl sm:ml-auto sm:pl-8"
    :class="props.isSearchbarOpened ? 'flex' : 'hidden sm:flex'"
  >
    <button
      type="reset"
      @click="props.toggleSearchbar(false)"
      class="mr-4"
      :class="props.isSearchbarOpened ? '' : 'hidden'"
    >
      <IconCross
        class="h-6 w-6"
        :class="props.isScrolled || !props.isSpecificPages ? '' : 'text-white'"
      />
    </button>
    <input
      v-model="input"
      class="w-full rounded-l-lg border-2 bg-transparent px-4 py-1 focus:outline-none"
      :class="
        props.isScrolled || !props.isSpecificPages
          ? 'focus:border-black'
          : 'text-white'
      "
      placeholder="Search for a movie, serie or person ..."
      type="text"
    />
    <button class="items-stretch rounded-r-lg bg-red-700 px-2">
      <IconsSearch class="h-6 w-6 text-white"></IconsSearch>
    </button>
  </form>
  <div class="ml-auto flex items-center space-x-4 sm:hidden">
    <button
      @click="props.toggleSearchbar(true)"
      class="items-stretch rounded-full"
      :class="props.isSearchbarOpened ? 'hidden' : ''"
    >
      <IconsSearch
        class="h-6 w-6"
        :class="
          props.isScrolled || !props.isSpecificPages || props.isMobileMenuOpened
            ? ''
            : 'text-white'
        "
      />
    </button>
  </div>
</template>
