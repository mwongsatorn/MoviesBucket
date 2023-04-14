<script setup lang="ts">
interface Props {
  sectionName: string;
  headerTitle: string;
}

const props = defineProps<Props>();
</script>

<template>
  <section :id="props.sectionName" class="mx-auto my-8 max-w-7xl px-4">
    <h1 class="text-2xl font-bold">{{ props.headerTitle }}</h1>
    <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
      <slot></slot>
    </div>
  </section>
</template>
