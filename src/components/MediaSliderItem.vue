<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import TransitionFade from "./TransitionFade.vue";
import IconChevronLeft from "./Icons/IconChevronLeft.vue";
import IconChevronRight from "./Icons/IconChevronRight.vue";
import type { Image, Video } from "@/types";

const props = defineProps<{
  initialIndex: number;
  sliderItemList: Image[] | Video[];
  itemAspectRatio: number;
}>();

const emits = defineEmits<{
  (e: "closeSlider"): void;
}>();

const index = ref<number>(props.initialIndex);
const slider = ref<HTMLElement | null>(null);

const item = computed(() => {
  return props.sliderItemList[index.value];
});

function slide(dir: number) {
  const curr = index.value;
  const len = props.sliderItemList.length;
  index.value = (curr + (dir % len) + len) % len;
}

function calculateWrapperSize(
  outerBoxWidth: number,
  outerBoxHeight: number,
  innerBoxAspectRatio: number
) {
  const outerBoxAspectRatio = outerBoxWidth / (outerBoxHeight - 128);
  let maxInnerBoxWidth, maxInnerBoxHeight;

  if (outerBoxAspectRatio > innerBoxAspectRatio) {
    maxInnerBoxHeight = outerBoxHeight - 128;
    maxInnerBoxWidth = maxInnerBoxHeight * innerBoxAspectRatio;
  } else {
    maxInnerBoxWidth = outerBoxWidth;
    maxInnerBoxHeight = maxInnerBoxWidth / innerBoxAspectRatio;
  }

  return {
    width: maxInnerBoxWidth,
    height: maxInnerBoxHeight,
  };
}

const resizeObserver = new ResizeObserver((entries) => {
  const sliderWidth = entries[0].target.getBoundingClientRect().width;
  const sliderHeight = entries[0].target.getBoundingClientRect().height;
  const wrapper = entries[0].target.firstElementChild as HTMLElement;

  const { width, height } = calculateWrapperSize(
    sliderWidth,
    sliderHeight,
    props.itemAspectRatio
  );
  wrapper.style.width = `${width}px`;
  wrapper.style.height = `${height}px`;
});

onMounted(() => {
  slider.value?.focus();
  resizeObserver.observe(slider.value!);
});

onUnmounted(() => {
  resizeObserver.disconnect();
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
      class="relative flex h-full min-h-[480px] w-full items-center justify-center"
    >
      <div class="border-2 border-white bg-gray-950">
        <TransitionFade>
          <iframe
            v-if="'key' in item"
            class="h-full w-full"
            :src="`https://www.youtube.com/embed/${item.key}`"
          />
          <img
            v-else
            :key="index"
            class="h-full w-full"
            :src="`https://image.tmdb.org/t/p/original/${item.file_path}`"
            alt=""
          />
        </TransitionFade>
      </div>

      <div
        class="absolute bottom-0 left-0 flex w-full items-center justify-between gap-x-4 xl:contents"
      >
        <button
          @click.stop="slide(-1)"
          class="items-center px-4 hover:bg-black xl:absolute xl:left-0 xl:h-full"
        >
          <IconChevronLeft class="h-6 w-6"></IconChevronLeft>
        </button>
        <div
          class="p-4 xl:absolute xl:bottom-0 xl:left-1/2 xl:-translate-x-1/2"
        >
          {{ index + 1 }} / {{ sliderItemList.length }}
        </div>
        <button
          @click.stop="slide(1)"
          class="items-center px-4 hover:bg-black xl:absolute xl:right-0 xl:h-full"
        >
          <IconChevronRight class="h-6 w-6"></IconChevronRight>
        </button>
      </div>
    </div>
  </div>
</template>
