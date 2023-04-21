<script setup lang="ts">
import { ref, computed, inject } from "vue";
import MediaImageCard from "./MediaImageCard.vue";
import MediaImageSlider from "./MediaImageSlider.vue";
import type { Image } from "@/types";

interface Inject {
  backdrops: Image[];
  posters: Image[];
}

const images = inject<Inject>("images");

const showSlider = ref(false);
const sliderImageType = ref<"posters" | "backdrops">("posters");
const sliderInitialIndex = ref(0);
const sliderImageList = computed(() => {
  return sliderImageType.value === "posters"
    ? images!.posters
    : images!.backdrops;
});

function expandImage(type: "posters" | "backdrops", index: number) {
  sliderImageType.value = type;
  sliderInitialIndex.value = index;
  document.body.classList.toggle("overflow-hidden");
  showSlider.value = true;
}

function closeImage() {
  showSlider.value = false;
  document.body.classList.toggle("overflow-hidden");
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
    <MediaImageSlider
      v-if="showSlider"
      :initial-index="sliderInitialIndex"
      :slider-image-list="sliderImageList"
      @close-slider="closeImage()"
    />
  </Teleport>
</template>
