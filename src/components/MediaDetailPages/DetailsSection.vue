<script setup lang="ts">
import PersonCard from "@/components/PersonCard.vue";
import type { CreditsCastDetails } from "@/types";

interface Props {
  cast: CreditsCastDetails[] | undefined;
}

const props = defineProps<Props>();
</script>

<template>
  <section id="cast" class="my-8 px-4">
    <h1 class="text-2xl font-bold">Cast</h1>
    <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
      <PersonCard
        v-for="person in props.cast"
        :key="person.id"
        :name="person.name"
        :id="person.id"
        :profile_path="person.profile_path"
        :character="person.character"
      />
    </div>
  </section>
</template>
