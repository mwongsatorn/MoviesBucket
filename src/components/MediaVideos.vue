<script setup lang="ts">
import { ref, watch, inject } from "vue";
import { vLazy } from "@/directives/lazy";
import IconPlayVideo from "./Icons/IconPlayVideo.vue";
import MediaItemSlider from "./MediaItemSlider.vue";
import type { Video } from "@/types";

const videos = inject<Video[]>("videos");
const videoTypeList = [...new Set(videos!.map((item) => item.type))];
const videoList = ref<Video[]>(videos!);
const selectedType = ref("All");

watch(selectedType, (type) => {
  if (type !== "All") {
    videoList.value = videos!.filter((video) => video.type === type);
  } else {
    videoList.value = videos!;
  }
});

const showSlider = ref(false);
const initialIndex = ref(0);

function expandVideo(index: number) {
  initialIndex.value = index;
  document.body.classList.toggle("overflow-hidden");
  showSlider.value = true;
}

function closeVideo() {
  showSlider.value = false;
  document.body.classList.toggle("overflow-hidden");
}
</script>

<template>
  <section id="videos" class="my-8 px-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">
        Videos ({{ selectedType }} : {{ videoList.length }})
      </h1>
      <select
        class="focuse:border-black w-full border-2 p-1.5 focus:border-2 sm:w-1/3"
        v-model="selectedType"
      >
        <option>All</option>
        <option v-for="(type, index) in videoTypeList" :key="index">
          {{ type }}
        </option>
      </select>
    </div>
    <div class="flex flex-wrap gap-2 py-6 @container">
      <div
        @click="expandVideo(index)"
        v-for="(video, index) in videoList"
        :key="video.id"
        class="group w-full cursor-pointer @lg:w-[calc(50%-8px)] @2xl:w-[calc(33.33%-8px)]"
      >
        <div class="relative aspect-video w-full bg-gray-300">
          <img
            v-lazy
            :data-src="`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`"
            class="block w-full object-cover object-center opacity-0 transition duration-500"
            alt=""
          />
          <div
            class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100"
          >
            <IconPlayVideo class="h-12 w-12" />
          </div>
        </div>

        <div class="py-2">
          <p class="font-bold">{{ video.name }}</p>
          <p class="text-sm text-gray-600">{{ video.type }}</p>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <MediaItemSlider
        v-if="showSlider"
        :initial-index="initialIndex"
        :slider-item-list="videoList"
        :item-aspect-ratio="16 / 9"
        @close-slider="closeVideo()"
      />
    </Teleport>
  </section>
</template>
