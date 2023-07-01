<script lang="ts" setup>
import { ref, onMounted, onUnmounted, onUpdated } from "vue";

const io = new IntersectionObserver(handleGridScroll);

function handleGridScroll(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    props.fetch && props.fetch();
  }
}
const cardsContainer = ref<HTMLElement | null>(null);
const props = defineProps<{
  fetch?: () => Promise<void>;
}>();

props.fetch && (await props.fetch());

onMounted(() => {
  props.fetch && io.observe(cardsContainer.value!.lastElementChild!);
});

onUpdated(() => {
  props.fetch && io.observe(cardsContainer.value!.lastElementChild!);
});

onUnmounted(() => {
  props.fetch && io.disconnect();
});
</script>
<template>
  <div
    ref="cardsContainer"
    class="grid grid-cols-2 gap-1.5 py-4 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5"
  >
    <slot name="cards"></slot>
  </div>
</template>
