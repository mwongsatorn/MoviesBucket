<script setup lang="ts">
import { ref, computed, inject } from "vue";
import MediaImageCard from "./MediaImageCard.vue";
import MediaItemSlider from "./MediaItemSlider.vue";
import CardGrid from "./CardGrid.vue";
import type { Image } from "@/types";

interface Inject {
  backdrops: Image[];
  posters: Image[];
}

const images = inject<Inject>("images");

const showSlider = ref(false);
const imageType = ref<"posters" | "backdrops">("posters");
const initialIndex = ref(0);
const imageAspectRatio = ref(0);
const imageList = computed(() => {
  return imageType.value === "posters" ? images!.posters : images!.backdrops;
});

function openSlider(type: "posters" | "backdrops", index: number) {
  imageType.value = type;
  initialIndex.value = index;
  if (type === "posters") imageAspectRatio.value = 2 / 3;
  if (type === "backdrops") imageAspectRatio.value = 16 / 9;
  document.body.classList.toggle("overflow-hidden");
  showSlider.value = true;
}

function closeSlider() {
  showSlider.value = false;
  document.body.classList.toggle("overflow-hidden");
}
</script>

<template>
  <section id="images" class="@container">
    <section class="my-8 px-4" id="backdrops">
      <h1 class="text-2xl font-bold">
        Backdrops ({{ images?.backdrops.length }})
      </h1>
      <CardGrid
        column="grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4 "
      >
        <template #cards>
          <MediaImageCard
            @click="openSlider('backdrops', index)"
            v-for="(image, index) in images?.backdrops"
            :key="index"
            :file-path="image.file_path"
            type="backdrops"
          />
        </template>
      </CardGrid>
    </section>
    <section class="my-8 px-4" id="posters">
      <h1 class="text-2xl font-bold">Posters ({{ images?.posters.length }})</h1>
      <CardGrid>
        <template #cards>
          <MediaImageCard
            @click="openSlider('posters', index)"
            v-for="(image, index) in images?.posters"
            :key="index"
            :file-path="image.file_path"
            type="posters"
          />
        </template>
      </CardGrid>
    </section>
    <Teleport to="body">
      <MediaItemSlider
        v-if="showSlider"
        :initial-index="initialIndex"
        :slider-item-list="imageList"
        :item-aspect-ratio="imageAspectRatio"
        @close-slider="closeSlider()"
      />
    </Teleport>
  </section>
</template>
