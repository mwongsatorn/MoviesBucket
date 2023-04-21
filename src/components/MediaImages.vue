<script setup lang="ts">
import { ref, computed, inject, nextTick } from "vue";
import type { Image } from "@/types";
import MediaImageCard from "./MediaImageCard.vue";
import TransitionFade from "./TransitionFade.vue";
import IconChevronLeft from "./Icons/IconChevronLeft.vue";
import IconChevronRight from "./Icons/IconChevronRight.vue";

interface Inject {
  backdrops: Image[];
  posters: Image[];
}

const images = inject<Inject>("images");

const slider = ref<HTMLElement | null>(null);
const showSlider = ref(false);
const sliderImageType = ref<"posters" | "backdrops">("posters");
const sliderImageIndex = ref(0);
const sliderImageList = computed(() => {
  return sliderImageType.value === "posters"
    ? images!.posters
    : images!.backdrops;
});

async function expandImage(type: "posters" | "backdrops", index: number) {
  sliderImageType.value = type;
  sliderImageIndex.value = index;
  document.body.classList.toggle("overflow-hidden");
  showSlider.value = true;
  await nextTick();
  slider.value?.focus();
}

function closeImage() {
  showSlider.value = false;
  document.body.classList.toggle("overflow-hidden");
}

function slide(dir: number) {
  const curr = sliderImageIndex.value;
  const len = sliderImageList.value.length;
  sliderImageIndex.value = (curr + (dir % len) + len) % len;
}
</script>

<template>
  <section class="my-8 px-4" id="backdrops">
    <h1 class="text-2xl font-bold">
      Backdrops ({{ images?.backdrops.length }})
    </h1>
    <div class="flex flex-wrap gap-2 py-6 @container">
      <MediaImageCard
        @click="expandImage('backdrops', index)"
        v-for="(image, index) in images?.backdrops"
        :key="index"
        :file-path="image.file_path"
        type="backdrops"
      />
    </div>
  </section>
  <section class="my-8 px-4" id="posters">
    <h1 class="text-2xl font-bold">Posters ({{ images?.posters.length }})</h1>
    <div class="flex flex-wrap gap-2 py-6 @container">
      <MediaImageCard
        @click="expandImage('posters', index)"
        v-for="(image, index) in images?.posters"
        :key="index"
        :file-path="image.file_path"
        type="posters"
      />
    </div>
  </section>
  <Teleport to="body">
    <div
      v-if="showSlider"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/90 text-white backdrop-blur-2xl"
      id="media-image-slider"
    >
      <div
        ref="slider"
        tabindex="0"
        @keydown.esc="closeImage"
        @keydown.left="slide(-1)"
        @keydown.right="slide(1)"
        @click.self="closeImage()"
        class="relative flex h-full min-h-[480px] w-full items-center justify-center lg:px-20"
      >
        <TransitionFade>
          <img
            :key="sliderImageIndex"
            class="max-h-[calc(100%-8rem)] border-2 border-white bg-gray-950"
            :src="`https://image.tmdb.org/t/p/original/${sliderImageList[sliderImageIndex].file_path}`"
            alt=""
          />
        </TransitionFade>

        <div
          class="absolute bottom-0 left-0 flex w-full items-center justify-between gap-x-4 lg:contents"
        >
          <button
            @click.stop="slide(-1)"
            class="items-center p-2 hover:bg-black lg:absolute lg:left-0 lg:h-full"
          >
            <IconChevronLeft class="h-6 w-6"></IconChevronLeft>
          </button>
          <div
            class="p-4 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
          >
            {{ sliderImageIndex + 1 }} / {{ sliderImageList.length }}
          </div>
          <button
            @click.stop="slide(1)"
            class="items-center p-2 hover:bg-black lg:absolute lg:right-0 lg:h-full"
          >
            <IconChevronRight class="h-6 w-6"></IconChevronRight>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
