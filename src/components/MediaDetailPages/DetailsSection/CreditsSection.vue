<script setup lang="ts">
import { ref, inject } from "vue";
import PersonCard from "@/components/PersonCard.vue";
import IconPerson from "@/components/Icons/IconPerson.vue";
import type {
  CreditsCastDetails,
  CreditsCrewDetails,
  AggregateCreditsCastDetails,
  AggregateCreditsCrewDetails,
} from "@/types";

interface Inject {
  cast: CreditsCastDetails[] | AggregateCreditsCastDetails[];
  crew: CreditsCrewDetails[] | AggregateCreditsCrewDetails[];
}

const credits = inject<Inject>("credits");

const activeSection = ref("short-cast");

function personCharacter(
  person: CreditsCastDetails | AggregateCreditsCastDetails
) {
  return "roles" in person ? person.roles[0].character : person.character;
}

function personJob(person: CreditsCrewDetails | AggregateCreditsCrewDetails) {
  return "jobs" in person ? person.jobs[0].job : person.job;
}
</script>

<template>
  <section
    v-show="activeSection === 'short-cast'"
    id="short-cast"
    class="my-8 px-4"
  >
    <div class="flex items-center gap-x-4">
      <h1 class="text-2xl font-bold">Cast</h1>
      <button
        @click="activeSection = 'full-credits'"
        class="font-bold text-rose-800"
      >
        View full credits
      </button>
    </div>
    <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
      <PersonCard
        v-for="person in credits!.cast.slice(0, 10)"
        :key="person.id"
        :name="person.name"
        :id="person.id"
        :profile_path="person.profile_path"
        :character="personCharacter(person)"
      />
    </div>
  </section>
  <section
    v-show="activeSection === 'full-credits'"
    id="full-credits"
    class="my-8 px-4"
  >
    <div class="my-8">
      <div class="flex items-center gap-x-4">
        <h1 class="text-2xl font-bold">Cast ({{ credits?.cast.length }})</h1>
        <button
          @click="activeSection = 'short-cast'"
          class="font-bold text-rose-800"
        >
          Back to the main cast
        </button>
      </div>
      <div class="grid grid-cols-1 gap-x-2 gap-y-4 px-1 py-6 sm:grid-cols-2">
        <div
          v-for="person in credits?.cast"
          :key="person.id"
          class="flex gap-x-4"
        >
          <img
            v-if="person.profile_path"
            class="aspect-square w-[75px] object-cover object-center"
            :src="`https://image.tmdb.org/t/p/w185/${person.profile_path}`"
            alt=""
          />
          <div
            v-else
            class="flex aspect-square w-[75px] items-center justify-center bg-gray-400"
          >
            <IconPerson class="h-12 w-12 text-white" />
          </div>
          <div>
            <p class="font-bold">{{ person.name }}</p>
            <p class="text-sm text-gray-500">{{ personCharacter(person) }}</p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-2xl font-bold">Crew ({{ credits?.crew.length }})</h1>
    <div class="grid grid-cols-1 gap-x-2 gap-y-3 px-1 py-6 sm:grid-cols-2">
      <div
        v-for="person in credits?.crew"
        :key="person.id"
        class="flex gap-x-4"
      >
        <img
          v-if="person.profile_path"
          class="aspect-square w-[75px] object-cover object-center"
          :src="`https://image.tmdb.org/t/p/w185/${person.profile_path}`"
          alt=""
        />
        <div
          v-else
          class="flex aspect-square w-[75px] items-center justify-center bg-gray-400"
        >
          <IconPerson class="h-12 w-12 text-white" />
        </div>
        <div>
          <p class="font-bold">{{ person.name }}</p>
          <p class="text-sm text-gray-500">{{ personJob(person) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
