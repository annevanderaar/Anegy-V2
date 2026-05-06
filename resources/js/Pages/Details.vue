<template>
  <PageHeader :title="title"/>

  <v-row>
    <ImageTile :title="data.title" :poster-path="data.poster_path"/>

    <v-col :class="['pl-6', {'pt-0' : mobile}]" lg="8">
      <DetailsTitle :data="data"/>

      <v-col class="text-center mb-6">
        <h3>{{ data.tagline }}</h3>

        <p>{{ data.overview }}</p>
      </v-col>

      <v-row v-if="current" class="mb-2">
        <h4>{{ $t('cards.release_date') }}: </h4>

        <p class="ml-2">
          {{ generalStore.getDate(data.release_date) }}
          ({{ data.status }})
        </p>
      </v-row>

      <v-row v-else class="mb-2">
        <h4>{{ $t('cards.first_air_date') }}:</h4>

        <p class="ml-2">
          {{ generalStore.getDate(data.first_air_date) }}
          ({{ data.status }})
        </p>
      </v-row>

      <v-row v-if="data.last_air_date" class="mb-2">
        <h4>{{ $t('cards.last_air_date') }}:</h4>

        <p class="ml-2">
          {{ generalStore.getDate(data.last_air_date) }}
        </p>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('details.language') }}:</h4>

        <v-chip
          class="ml-2"
        >
          <span class="text-uppercase">
            {{ data.original_language }}
          </span>
        </v-chip>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('details.runtime') }}:</h4>

        <p class="ml-2">
          {{ data.runtime ? data.runtime : String(data.episode_run_time) }} min
        </p>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('details.score') }}:</h4>

        <v-avatar
          :color="getColor(data.vote_average)"
          rounded="0"
          class="ma-2 text-white rounded"
        >
          {{ data.vote_average >= 0 ? data.vote_average.toFixed(1) : 'P' }}
        </v-avatar>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('details.budget') }}:</h4>

        <p class="ml-2">
          ${{ localString(data.budget) }}
        </p>
      </v-row>

      <v-row class="mb-2">
        <h4>{{ $t('details.revenue') }}:</h4>

        <p class="ml-2">
          ${{ localString(data.revenue) }}
        </p>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('filters.genres') }}:</h4>

        <v-chip
          v-for="item in data.genres"
          :key="item.id"
          class="btnText"
          variant="outlined"
        >
          {{ item.name }}
        </v-chip>
      </v-row>

      <Links/>

      <v-row class="flex-align">
        <h4>{{ $t('details.production_companies') }}:</h4>

        <v-chip
          v-for="company in data.production_companies"
          :key="company.id"
          class="btnText"
          variant="outlined"
        >
          {{ company.name }}
        </v-chip>
      </v-row>

      <v-row class="flex-align">
        <h4>{{ $t('details.production_countries') }}:</h4>

        <v-chip
          v-for="country in data.production_countries"
          :key="country.iso_3166_1"
          class="btnText"
          variant="outlined"
        >
          {{ country.iso_3166_1 }}
          | {{ country.name }}
        </v-chip>
      </v-row>

      <v-row v-if="detailStore.providers" class="flex-align">
        <h4>{{ $t('details.watch_nl') }}:</h4>

        <v-chip
          v-for="item in detailStore.providers.flatrate"
          :key="item.provider_id"
          class="btnText"
          variant="outlined"
        >
          {{ item.provider_name }}
        </v-chip>

        <v-chip
          v-for="item in detailStore.providers.buy"
          :key="item.provider_id"
          class="btnText"
          variant="outlined"
        >
          {{ item.provider_name }}
        </v-chip>

        <v-chip
          v-for="item in detailStore.providers.rent"
          :key="item.provider_id"
          class="btnText"
          variant="outlined"
        >
          {{ item.provider_name }}
        </v-chip>

        <v-chip
          v-for="item in iLinks"
          :key="item.name"
          :href="item.to"
          class="btnText"
          target="_blank"
          variant="outlined"
        >
          {{ item.name }}
        </v-chip>
      </v-row>

      <v-row v-else class="flex-align">
        <h4>{{ $t('details.watch_nl') }}:</h4>

        <v-chip
          v-for="item in iLinks"
          :key="item.name"
          :href="item.to"
          class="btnText"
          target="_blank"
          variant="outlined"
        >
          {{ item.name }}
        </v-chip>
      </v-row>
    </v-col>

    <v-col sm="12">
      <v-tabs
        color="accent"
        stacked
        icons-and-text
        fixed-tabs
        show-arrows
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

      <Credits
        v-if="selectedTab === 'cast'"
        :credits="detailStore.credits"
        type="cast"
      />

      <Credits
        v-else-if="selectedTab === 'crew'"
        :credits="detailStore.credits"
        type="crew"
      />

      <Collection
        v-else-if="selectedTab === 'collection'"
        :collection="detailStore.collection"
      />

      <Seasons
        v-else-if="selectedTab === 'seasons'"
        :seasons="detailStore.seasons"
      />

      <Videos
        v-else-if="selectedTab === 'videos'"
        :videos="detailStore.videos"
      />

      <Reviews
        v-else-if="selectedTab === 'reviews'"
        :reviews="detailStore.reviews"
      />

      <Similar
        v-else-if="selectedTab === 'similar'"
        :similar="detailStore.similar"
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
import Collection from '@/Pages/Details/Collection.vue';
import DetailsTitle from '@/Pages/Details/DetailsTitle.vue';
import ImageTile from '@/Pages/Details/ImageTile.vue';
import Reviews from '@/Pages/Details/Reviews.vue';
import Seasons from '@/Pages/Details/Seasons.vue';
import Videos from '@/Pages/Details/Videos.vue';
import Similar from '@/Pages/Details/Similar.vue';
import Credits from '@/Pages/Details/Credits.vue';
import { DetailsStore } from '@/Stores/DetailsStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { ListStore } from '@/Stores/ListStore';
import { GeneralStore } from '@/Stores/GeneralStore';
import route from 'ziggy-js';

const id = usePage().props.route_parameters.id;
const title = ref('');
const selectedTab = ref('cast');

const detailStore = DetailsStore();
const generalStore = GeneralStore();
const languageStore = LanguageStore();
const listStore = ListStore();

const { mobile } = useDisplay();

const tabs = ref([
  {
    title: 'details.cast.title',
    icon: 'mdi-account-box-multiple',
    val: 'cast',
  },
  {
    title: 'details.crew',
    icon: 'mdi-account-group',
    val: 'crew',
  },
  {
    title: 'details.seasons.title',
    icon: 'mdi-cards-variant',
    val: 'seasons',
  },
  {
    title: 'details.collection.title',
    icon: 'mdi-bookmark-box-multiple',
    val: 'collection',
  },
  {
    title: 'details.videos.title',
    icon: 'mdi-filmstrip-box-multiple',
    val: 'videos',
  },
  {
    title: 'details.reviews.title',
    icon: 'mdi-message-text',
    val: 'reviews',
  },
  {
    title: 'details.similar',
    icon: 'mdi-approximately-equal-box',
    val: 'similar',
  },
]);

const iLinks = [
  {
    name: '123Movies',
    to: 'https://ww8.123moviesfree.net/',
  },
  {
    name: 'Watch Series',
    to: 'https://ww.watchseriesfree.co/',
  },
  {
    name: 'Putlockers',
    to: 'https://putlocker.best/',
  },
  {
    name: 'Cineby',
    to: 'https://www.cineby.sc/',
  },
];

const data = computed(() => {
  return detailStore.data;
});

const current = computed(() => {
  return route().current('movies.*');
});

const translate = computed(() => {
  return languageStore.translate;
});

const user = computed(() => {
  return usePage().props.auth.user;
});

const refreshFav = computed(() => {
  return listStore.favorites.refresh;
});

const refreshWat = computed(() => {
  return listStore.watched.refresh;
});

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

const getDetails = val => {
  detailStore.getDetails(`/${val}/${id}`);
  detailStore.getLinks(`/${val}/${id}/external_ids`);
  detailStore.getProviders(`/${val}/${id}/watch/providers`);
  detailStore.getCredits(`/${val}/${id}/credits`);
  detailStore.getVideos(`/${val}/${id}/videos`);
  detailStore.getReviews(`/${val}/${id}/reviews`);
  detailStore.getSimilar(`/${val}/${id}/similar`);
  getFavorites();
  getWatched();
};

const getTabs = () => {
  if (current.value) {
    tabs.value.splice(2, 1);
    return;
  }

  tabs.value.splice(3, 1);
};

const getYear = date => {
  return new Date(date).toLocaleDateString(languageStore.tmdb, {
    year: 'numeric',
  });
};

const getColor = average => {
  if (average >= 7.5) {
    return 'green';
  }

  if (average >= 5) {
    return 'orange';
  }

  return 'red';
};

const localString = price => {
  if (price) {
    return parseInt(price).toLocaleString();
  }

  return '-';
};

const show = value => {
  selectedTab.value = value;
};

watch(data, val => {
  if (val) {
    if (current.value) {
      document.title = `${val.title} ${getYear(val.release_date)} - Anegy`;
    } else {
      document.title = `${val.name} ${getYear(val.first_air_date)} - Anegy`;
    }
  }
});

watch(translate, () => {
  getDetails(current.value ? 'movie' : 'tv');
});

watch(refreshFav, () => {
  getFavorites();
});

watch(refreshWat, () => {
  getWatched();
});

onMounted(() => {
  getTabs();
  getDetails(current.value ? 'movie' : 'tv');
});
</script>
