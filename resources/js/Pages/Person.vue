<template>
  <PageHeader :title="title"/>

  <v-row>
    <ImageTile
      :title="data.title"
      :profile-path="data.profile_path"
    />

    <v-col :class="['pl-6', {'pt-0' : mobile}]" lg="8">
      <DetailsTitle :data="data"/>

      <v-col class="text-center mb-4">
        <h3>{{ data.known_for_department }}</h3>

        <p>{{ data.biography }}</p>
      </v-col>

      <v-row class="mb-2">
        <h4>{{ $t('person.birth') }}:</h4>

        <p class="ml-2">
          {{ generalStore.getDate(data.birthday) }}
        </p>
      </v-row>

      <v-row v-if="data.deathday" class="mb-2">
        <h4>{{ $t('person.death') }}:</h4>

        <p class="ml-2">
          {{ generalStore.getDate(data.deathday) }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('person.age') }}:</h4>

        <p class="ml-2">
          {{ getAge(data.birthday) }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('person.place_birth') }}:</h4>

        <p class="ml-2">
          {{ data.place_of_birth }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('person.gender') }}:</h4>

        <p v-if="data.gender == 1" class="ml-2">
          {{ $t('person.female') }}
        </p>

        <p v-if="data.gender == 2" class="ml-2">
          {{ $t('person.male') }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('cards.known_for') }}:</h4>

        <p class="ml-2">
          {{ data.known_for_department }}
        </p>
      </v-row>

      <Links/>
    </v-col>

    <v-col md="12">
      <v-tabs
        color="accent"
        stacked
        icons-and-text
        fixed-tabs
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.title"
          @click="show(tab.val)"
        >
          <v-icon>{{ tab.icon }}</v-icon>

          {{ $t(tab.title) }}
        </v-tab>
      </v-tabs>

      <PersonCards
        v-if="selectedTab === 'movies'"
        :person-movies="detailStore.personMovies"
      />

      <PersonCards
        v-else-if="selectedTab === 'series'"
        :person-series="detailStore.personSeries"
      />

      <Images
        v-else-if="selectedTab === 'images'"
        :images="detailStore.images"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useDisplay } from 'vuetify';
import Links from '@/Components/Links.vue';
import PageHeader from '@/Components/PageHeader.vue';
import DetailsTitle from '@/Pages/Details/DetailsTitle.vue';
import ImageTile from '@/Pages/Details/ImageTile.vue';
import Images from '@/Pages/Details/Images.vue';
import PersonCards from '@/Pages/Details/PersonCards.vue';
import { DetailsStore } from '@/Stores/DetailsStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { ListStore } from '@/Stores/ListStore';
import { GeneralStore } from '@/Stores/GeneralStore';

const id = usePage().props.route_parameters.id;
const title = ref('');
const selectedTab = ref('movies');

const detailStore = DetailsStore();
const generalStore = GeneralStore();
const languageStore = LanguageStore();
const listStore = ListStore();

const { mobile } = useDisplay();

const tabs = [
  {
    title: 'movies',
    icon: 'mdi-movie-open',
    val: 'movies',
  },
  {
    title: 'series',
    icon: 'mdi-television-classic',
    val: 'series',
  },
  {
    title: 'images',
    icon: 'mdi-image-multiple',
    val: 'images',
  },
];

const data = computed(() => detailStore.data);
const translate = computed(() => languageStore.translate);
const user = computed(() => usePage().props.auth.user);
const refreshFav = computed(() => listStore.favorites.refresh);
const refreshWat = computed(() => listStore.watched.refresh);

const getFavorites = () => {
  if (user.value) {
    listStore.getAll('favorites', user.value.id);
  }
};

const getWatched = () => {
  if (user.value) {
    listStore.getAll('watched', user.value.id);
  }
};

const getDetails = () => {
  detailStore.getDetails(`/person/${id}`);
  detailStore.getLinks(`/person/${id}/external_ids`);
  detailStore.getPersonMovies(id);
  detailStore.getPersonSeries(id);
  detailStore.getImages(id);
  getFavorites();
  getWatched();
};

const getAge = dateString => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const show = value => {
  selectedTab.value = value;
};

watch(data, val => {
  if (val) {
    document.title = `${val.name} - Anegy`;
  }
});

watch(translate, () => {
  getDetails();
});

watch(refreshFav, () => {
  getFavorites();
});

watch(refreshWat, () => {
  getWatched();
});

onMounted(() => {
  getDetails();
});
</script>
