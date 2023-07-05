<script setup lang="ts">
import { vLazy } from "@/directives/lazy";
import IconPerson from "./Icons/IconPerson.vue";
import type {
  ShortPersonDetails,
  AggregateCreditsCastDetails,
  CreditsCastDetails,
} from "@/types";

const props = defineProps<{
  person: ShortPersonDetails | CreditsCastDetails | AggregateCreditsCastDetails;
}>();

function role() {
  if ("roles" in props.person) return props.person.roles[0].character;
  if ("character" in props.person) return props.person.character;
  return null;
}
</script>

<template>
  <RouterLink
    :to="`/people/${props.person.id}`"
    class="relative w-full shrink-0 space-y-1 overflow-hidden rounded-lg shadow-lg"
  >
    <div class="overflow-hidden" v-if="props.person.profile_path">
      <img
        v-lazy
        class="aspect-[2/3] w-full opacity-0 transition duration-500 hover:scale-105"
        alt=""
        :data-src="`https://image.tmdb.org/t/p/w300/${props.person.profile_path}`"
      />
    </div>
    <div
      v-else
      class="flex aspect-[2/3] w-full items-center justify-center bg-gray-400"
    >
      <IconPerson class="h-20 w-20 text-white" />
    </div>
    <p class="line-clamp-1 px-2">{{ props.person.name }}</p>
    <p v-if="role()" class="line-clamp-1 px-2 text-sm text-gray-400">
      {{ role() }}
    </p>
  </RouterLink>
</template>
