<script setup lang="ts">
import { RouterLink } from "vue-router";
import IconPerson from "@/components/Icons/IconPerson.vue";
import type {
  ShortPersonAggregateCastDetails,
  ShortPersonAggregateCrewDetails,
  ShortPersonCastDetails,
  ShortPersonCrewDetails,
} from "@/types";

type Person =
  | ShortPersonCastDetails
  | ShortPersonCrewDetails
  | ShortPersonAggregateCastDetails
  | ShortPersonAggregateCrewDetails;

const props = defineProps<{ person: Person }>();

function role() {
  if ("character" in props.person) return props.person.character;
  if ("roles" in props.person) return props.person.roles[0].character;
  if ("job" in props.person) return props.person.job;
  return props.person.jobs[0].job;
}
</script>

<template>
  <RouterLink class="flex gap-x-4" :to="`/people/${props.person.id}`">
    <img
      v-if="props.person.profile_path"
      class="aspect-square w-[75px] rounded-lg object-cover object-center"
      :src="`https://image.tmdb.org/t/p/w185/${props.person.profile_path}`"
      alt=""
    />
    <div
      v-else
      class="flex aspect-square w-[75px] items-center justify-center rounded-lg bg-gray-400"
    >
      <IconPerson class="h-12 w-12 text-white" />
    </div>
    <div>
      <p class="font-bold">{{ props.person.name }}</p>
      <p class="text-sm text-gray-500">
        {{ role() }}
      </p>
    </div>
  </RouterLink>
</template>
