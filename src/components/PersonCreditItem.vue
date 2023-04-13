<script setup lang="ts">
import { RouterLink } from "vue-router";
import IconPerson from "@/components/Icons/IconPerson.vue";

interface Props {
  id: number | null;
  profile_path: string | null;
  name: string | null;
  character?: string | null;
  job?: string | null;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink class="flex gap-x-4" :to="`/people/${props.id}`">
    <img
      v-if="props.profile_path"
      class="aspect-square w-[75px] rounded-lg object-cover object-center"
      :src="`https://image.tmdb.org/t/p/w185/${props.profile_path}`"
      alt=""
    />
    <div
      v-else
      class="flex aspect-square w-[75px] items-center justify-center rounded-lg bg-gray-400"
    >
      <IconPerson class="h-12 w-12 text-white" />
    </div>
    <div>
      <p class="font-bold">{{ props.name }}</p>
      <p v-if="props.character" class="text-sm text-gray-500">
        {{ props.character }}
      </p>
      <p v-else class="text-sm text-gray-500">
        {{ props.job }}
      </p>
    </div>
  </RouterLink>
</template>
