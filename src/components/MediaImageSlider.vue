<script setup lang="ts">
import { ref, onMounted } from "vue";
import TransitionFade from "./TransitionFade.vue";
import IconChevronLeft from "./Icons/IconChevronLeft.vue";
import IconChevronRight from "./Icons/IconChevronRight.vue";
import type { Image } from "@/types";

const props = defineProps<{
  initialIndex: number;
  sliderImageList: Image[];
}>();

const emits = defineEmits<{
  (e: "closeSlider"): void;
}>();

const index = ref<number>(props.initialIndex);
const slider = ref<HTMLElement | null>(null);

function slide(dir: number) {
  const curr = index.value;
  const len = props.sliderImageList.length;
  index.value = (curr + (dir % len) + len) % len;
}

onMounted(() => {
  slider.value?.focus();
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto bg-black/90 text-white backdrop-blur-2xl"
    id="media-image-slider"
  >
    <div
      ref="slider"
      tabindex="0"
      @keydown.esc="emits('closeSlider')"
      @keydown.left="slide(-1)"
      @keydown.right="slide(1)"
      @click.self="emits('closeSlider')"
      class="relative flex h-full min-h-[480px] w-full items-center justify-center lg:px-20"
    >
      <TransitionFade>
        <img
          :key="index"
          class="max-h-[calc(100%-8rem)] border-2 border-white bg-gray-950"
          :src="`https://image.tmdb.org/t/p/original/${sliderImageList[index].file_path}`"
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
          {{ index + 1 }} / {{ sliderImageList.length }}
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
</template>
