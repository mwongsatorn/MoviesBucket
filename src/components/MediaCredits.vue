<script setup lang="ts">
import { ref, inject } from "vue";
import TransitionFade from "./TransitionFade.vue";
import PersonCard from "@/components/PersonCard.vue";
import PersonCreditItem from "@/components/PersonCreditItem.vue";
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

function personCastProps(
  person: CreditsCastDetails | AggregateCreditsCastDetails
) {
  return {
    id: person.id,
    name: person.name,
    profilePath: person.profile_path,
    character: "roles" in person ? person.roles[0].character : person.character,
  };
}

function personCrewProps(
  person: CreditsCrewDetails | AggregateCreditsCrewDetails
) {
  return {
    id: person.id,
    name: person.name,
    profilePath: person.profile_path,
    job: "jobs" in person ? person.jobs[0].job : person.job,
  };
}
</script>

<template>
  <TransitionFade>
    <section
      v-if="activeSection === 'short-cast'"
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
      <div
        class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6 @container/scroll"
      >
        <PersonCard
          v-for="person in credits!.cast.slice(0, 10)"
          :key="person.id"
          v-bind="personCastProps(person)"
        />
      </div>
    </section>
    <section
      v-if="activeSection === 'full-credits'"
      id="full-credits"
      class="my-8 px-4"
    >
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
        <PersonCreditItem
          v-for="person in credits?.cast"
          :key="person.id"
          v-bind="personCastProps(person)"
        />
      </div>

      <h1 class="text-2xl font-bold">Crew ({{ credits?.crew.length }})</h1>
      <div class="grid grid-cols-1 gap-x-2 gap-y-4 px-1 py-6 sm:grid-cols-2">
        <PersonCreditItem
          v-for="person in credits?.crew"
          :key="person.id"
          v-bind="personCrewProps(person)"
        />
      </div>
    </section>
  </TransitionFade>
</template>
