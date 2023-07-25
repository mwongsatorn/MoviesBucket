<script lang="ts" setup>
import { ref } from "vue";
import { getPersonDetails } from "@/composables/tmdb";
import IconFacebook from "@/components/Icons/IconFacebook.vue";
import IconInstagram from "@/components/Icons/IconInstagram.vue";
import IconImdb from "@/components/Icons/IconImdb.vue";
import IconTwitter from "@/components/Icons/IconTwitter.vue";
import IconTikTok from "@/components/Icons/IconTikTok.vue";
import IconYoutube from "@/components/Icons/IconYoutube.vue";
import PersonKnownFor from "@/components/PersonKnownFor.vue";
import PersonPhotos from "@/components/PersonPhotos.vue";
import TransitionFade from "@/components/TransitionFade.vue";
import IconPerson from "@/components/Icons/IconPerson.vue";
import type { PersonExternalIds } from "@/types";

const props = defineProps<{ id: string }>();

const { data: person } = await getPersonDetails(props.id);
const activeTab = ref<keyof typeof tabs>("Known for");

const socialType = [
  "imdb_id",
  "facebook_id",
  "twitter_id",
  "instagram_id",
  "tiktok_id",
  "youtube_id",
];

const socialListTemplate: Partial<
  Record<keyof PersonExternalIds, { icon: any; link: string }>
> = {
  imdb_id: {
    icon: IconImdb,
    link: "https://www.imdb.com/title/",
  },
  facebook_id: {
    icon: IconFacebook,
    link: "https://www.facebook.com/",
  },
  twitter_id: {
    icon: IconTwitter,
    link: "https://twitter.com/",
  },
  instagram_id: {
    icon: IconInstagram,
    link: "https://www.instagram.com/",
  },
  tiktok_id: {
    icon: IconTikTok,
    link: "https://www.tiktok.com/@",
  },
  youtube_id: {
    icon: IconYoutube,
    link: "https://www.youtube.com/@",
  },
};

const sideInfo = {
  "Known for": person.value?.known_for_department,
  Gender: () => {
    const gender = person.value?.gender;
    if (gender === 0) return "Not specified";
    if (gender === 1) return "Female";
    if (gender === 2) return "Male";
    if (gender === 3) return "Non-binary";
  },
  Birthday: person.value?.birthday,
  "Place of Birth": person.value?.place_of_birth,
  "Also known as": () => {
    if (person.value?.also_known_as.length === 0) return "-";
    return person.value?.also_known_as.join(", ");
  },
};

const tabs = {
  "Known for": {
    component: PersonKnownFor,
    props: () => ({ list: knownForList() }),
  },
  Photos: {
    component: PersonPhotos,
    props: () => ({ photos: person.value!.images.profiles }),
  },
};

function socialList() {
  return Object.entries(person.value!.external_ids).reduce(
    (acc, [key, value]) => {
      if (!socialType.includes(key)) return acc;
      if (value !== null && value !== undefined && value !== "") {
        acc[key as keyof PersonExternalIds] = value;
      }
      return acc;
    },
    {} as Partial<PersonExternalIds>
  );
}

function biography() {
  if (!person.value?.biography)
    return "There is no biography about this person";
  const biography = person.value.biography.split("\n");
  return biography;
}

function knownForList() {
  const list = [];
  if (person.value?.known_for_department === "Acting") {
    list.push(...person.value.combined_credits.cast);
  } else {
    const filerList = person.value!.combined_credits.crew.filter((f) => {
      return f.department === person.value?.known_for_department;
    });
    list.push(...filerList);
  }
  return list;
}
</script>

<template>
  <main>
    <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[300px_1fr]">
      <aside
        class="flex flex-col gap-x-4 gap-y-4 bg-gray-50 px-4 py-8 sm:flex-row lg:block"
      >
        <div
          class="flex aspect-[2/3] w-[250px] shrink-0 items-center justify-center self-center overflow-hidden rounded-lg bg-gray-400 lg:w-full"
        >
          <img
            v-if="person?.profile_path"
            class="h-full w-full"
            :src="`https://image.tmdb.org/t/p/w300/${person.profile_path}`"
            alt=""
          />
          <IconPerson class="h-20 w-20 text-white" />
        </div>
        <div class="flex flex-wrap content-start gap-y-4 lg:mt-4">
          <h1 class="w-full text-2xl font-bold capitalize">
            {{ person?.name }}
          </h1>
          <div class="w-full">
            <div class="flex flex-wrap items-center gap-x-4 gap-y-4">
              <a
                v-for="(value, key, index) in socialList()"
                :key="index"
                :href="`${socialListTemplate[key]?.link}${value}`"
                target="_blank"
              >
                <component
                  class="h-6 w-6 duration-300 hover:text-rose-800"
                  :is="socialListTemplate[key]?.icon"
                />
              </a>
            </div>
          </div>
          <div
            v-for="(info, key, index) in sideInfo"
            :key="index"
            :class="[key === 'Also known as' ? 'w-full' : 'w-1/2 lg:w-full']"
          >
            <h2 class="font-bold">{{ key }}</h2>
            <p v-if="info">{{ typeof info === "function" ? info() : info }}</p>
            <p v-else>-</p>
          </div>
        </div>
      </aside>
      <section>
        <div class="my-8 space-y-4 px-4">
          <h1 class="text-xl font-bold sm:text-2xl">Biography</h1>
          <template v-if="Array.isArray(biography())">
            <p v-for="(p, index) in biography()" :key="index">
              {{ p }}
            </p>
          </template>
          <p v-else>{{ biography() }}</p>
        </div>
        <div class="flex">
          <button
            v-for="(_, tab, index) in tabs"
            @click="activeTab = tab"
            :key="index"
            :class="[
              activeTab === tab
                ? 'bg-rose-800 text-white'
                : 'hover:bg-amber-500 hover:text-white',
            ]"
            class="flex-grow bg-gray-50 px-2 py-4 text-center text-sm font-bold uppercase sm:text-base"
          >
            {{ tab }}
          </button>
        </div>
        <TransitionFade>
          <KeepAlive>
            <component
              :is="(tabs[activeTab].component as any)"
              v-bind="tabs[activeTab].props()"
            />
          </KeepAlive>
        </TransitionFade>
      </section>
    </div>
  </main>
</template>
