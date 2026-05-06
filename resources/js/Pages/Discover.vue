<template>
  <PageHeader :title="pageName"/>

  <FilterButton @click="filterStore.drawer = true"/>

  <h1 class="text-center">
    {{ pageName }}
  </h1>

  <Filter/>

  <Cards :results="data.results"/>

  <v-pagination
    v-model="dataStore.page"
    :length="dataStore.totalPages"
    :total-visible="!mobile ? 15 : 3"
    color="secondary"
    class="my-4"
  />
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useDisplay } from 'vuetify';
import Cards from '@/Components/Cards.vue';
import Filter from '@/Components/Filters/Filter.vue';
import FilterButton from '@/Components/Filters/FilterButton.vue';
import PageHeader from '@/Components/PageHeader.vue';
import { DataStore } from '@/Stores/DataStore';
import { FilterStore } from '@/Stores/FilterStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { SearchStore } from '@/Stores/SearchStore';
import { ListStore } from '@/Stores/ListStore';
import { route } from 'ziggy-js';

const instance = getCurrentInstance();
const { mobile } = useDisplay();

const languageStore = LanguageStore();
const dataStore = DataStore();
const filterStore = FilterStore();
const searchStore = SearchStore();
const listStore = ListStore();

const pageName = ref('');

const data = computed(() => dataStore.data);
const page = computed(() => dataStore.page);
const translate = computed(() => languageStore.translate);
const genres = computed(() => filterStore.select);
const user = computed(() => usePage().props.auth.user);
const refreshFav = computed(() => listStore.favorites.refresh);
const refreshWat = computed(() => listStore.watched.refresh);

const t = (key, params) => instance.proxy.$t(key, params);

const routeConfig = {
  movies: {
    discover: {
      title: 'discover',
      url: '/discover/movie?',
    },
    trending: {
      title: 'trending',
      url: '/trending/movie/day?',
    },
    popular: {
      title: 'popular',
      url: '/movie/popular?',
    },
    playing: {
      title: 'playing',
      url: '/movie/now_playing?',
    },
    'top-rated': {
      title: 'top_rated',
      url: '/movie/top_rated?',
    },
    upcoming: {
      title: 'upcoming',
      url: '/movie/upcoming?',
    },
  },
  series: {
    discover: {
      title: 'discover',
      url: '/discover/tv?',
    },
    trending: {
      title: 'trending',
      url: '/trending/tv/day?',
    },
    popular: {
      title: 'popular',
      url: '/tv/popular?',
    },
    playing: {
      title: 'playing',
      url: '/tv/on_the_air?',
    },
    'top-rated': {
      title: 'top_rated',
      url: '/tv/top_rated?',
    },
    upcoming: {
      title: 'upcoming',
      url: '/tv/airing_today?',
    },
  },
};

const getCurrentRouteConfig = () => {
  const type = route().current('movies.*') ? 'movies' : 'series';
  const routes = routeConfig[type];

  const key = Object.keys(routes).find(item => {
    return route().current(`${type}.${item}`);
  });

  return {
    type,
    config: routes[key],
  };
};

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

const getRoutes = () => {
  const currentRoute = getCurrentRouteConfig();

  if (!currentRoute.config) {
    return;
  }

  const translatedType = currentRoute.type === 'movies'
    ? t('movies')
    : t('series');

  pageName.value = t(currentRoute.config.title, { name: translatedType });
  dataStore.url = currentRoute.config.url;

  dataStore.getDiscover();
  getFavorites();
  getWatched();

  if (localStorage.currentPage) {
    dataStore.page = parseInt(localStorage.currentPage);
  }
};

const scroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(page, val => {
  localStorage.currentPage = val;

  if (searchStore.searching) {
    searchStore.searchPage = val;
    searchStore.getSearch();
  } else {
    dataStore.page = val;
    dataStore.getDiscover();
  }

  scroll();
});

watch(translate, () => {
  dataStore.getDiscover();
  getRoutes();
});

watch(genres, () => {
  dataStore.genres = filterStore.selectedGenres;
  dataStore.getDiscover();
});

watch(refreshFav, () => {
  getFavorites();
});

watch(refreshWat, () => {
  getWatched();
});

onMounted(() => {
  getRoutes();
});
</script>
